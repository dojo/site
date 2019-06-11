import harness from '@dojo/framework/testing/harness';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import Dimensions from '@dojo/framework/widget-core/meta/Dimensions';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';
import Block from '@dojo/framework/widget-core/meta/Block';

import { MockMetaMixin } from './MockMeta';

function testBlock(options: { locale: string }) {
	const { locale } = options;
	return `path/to/${locale}/docs`;
}
function otherTestBlock() {}

describe('MockMeta', () => {
	class MetaWidgetOnce extends WidgetBase {
		protected render() {
			expect(this.meta(Focus).set('root')).toBeUndefined();

			// Root Focus.get() call one
			expect(this.meta(Focus).get('root')).toEqual({
				active: false,
				containsFocus: true
			});

			// Order does not matter between different arguements
			expect(this.meta(Focus).get('notRoot')).toEqual({
				active: true,
				containsFocus: true
			});

			// Root Focus.get() call two
			expect(this.meta(Focus).get('root')).toEqual({
				active: false,
				containsFocus: false
			});

			// Order does not matter between different metas
			expect(this.meta(Dimensions).get('root')).toEqual({
				size: {
					width: 24,
					height: 24
				}
			});

			// Root Focus.get() call three
			expect(this.meta(Focus).get('root')).toEqual({
				active: false,
				containsFocus: true
			});

			// No 4th registered call for root
			expect(() => this.meta(Focus).get('root')).toThrowError(
				'Arguements ["root"] were registered 3 time(s) for Focus.get() but have been called 4 time(s)'
			);

			// Not registered so an error is thrown
			expect(() => this.meta(Focus).get('notRegistered')).toThrowError(
				'Arguements ["notRegistered"] not registered for Focus.get()'
			);

			// Not registered so an error is thrown
			expect(() => this.meta(Intersection).get('root')).toThrowError("Meta 'Intersection' not registered");

			// Block meta is called with options (is actually calling mockTestBlock)
			this.meta(Block).run(testBlock)({ locale: 'en' });

			// A non-registered function is called for Block meta, resulting in an error
			expect(() => this.meta(Block).run(otherTestBlock)()).toThrowError(
				'Arguements function otherTestBlock() { } not registered for Block.run()'
			);

			// Call two to Block meta for testBlock generates an error with the function printed out
			expect(() => this.meta(Block).run(testBlock)({ locale: 'fr' })).toThrowError(
				`Arguements ${testBlock} were registered 1 time(s) for Block.run() but have been called 2 time(s)`
			);

			return <div key="root" />;
		}
	}

	test('registerMetaCallOnce', () => {
		const mockMetaMixin = new MockMetaMixin(MetaWidgetOnce);

		// Register two calls at once
		mockMetaMixin.registerMetaCallOnce(
			Focus,
			'get',
			['root'],
			{
				active: false,
				containsFocus: true
			},
			{
				active: false,
				containsFocus: false
			}
		);

		// Register one additional call (the 3rd call)
		mockMetaMixin.registerMetaCallOnce(Focus, 'get', ['root'], {
			active: false,
			containsFocus: true
		});

		// Register a different meta for the same arguements
		mockMetaMixin.registerMetaCall(Dimensions, 'get', ['root'], {
			size: {
				width: 24,
				height: 24
			}
		});

		// Register 'get' method but with different arguements and to always return the same value no matter the number of calls
		mockMetaMixin.registerMetaCall(Focus, 'get', ['notRoot'], {
			active: true,
			containsFocus: true
		});

		// Register a call to 'set' for root. Order in registering only matters within same function/arguements
		mockMetaMixin.registerMetaCallOnce(Focus, 'set', ['root'], undefined);

		// Can use a function as an identifier (as Block requires)
		const mockTestBlock = jest.fn();
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [testBlock], mockTestBlock);

		const TestFocusWidget = mockMetaMixin.getClass();

		const h = harness(() => <TestFocusWidget />);
		h.expect(() => <div key="root" />);

		expect(mockTestBlock).toHaveBeenCalledWith({ locale: 'en' });
	});

	class MetaWidget extends WidgetBase {
		protected render() {
			// Registered to always return the same value no matter the number of calls
			expect(this.meta(Focus).get('root')).toEqual({
				active: true,
				containsFocus: false
			});

			// Order does not matter between different metas
			expect(this.meta(Dimensions).get('root')).toEqual({
				size: {
					width: 24,
					height: 24
				}
			});

			// Root Focus.get() call two
			expect(this.meta(Focus).get('root')).toEqual({
				active: true,
				containsFocus: false
			});

			// Root Dimensions.get() call two
			expect(this.meta(Dimensions).get('root')).toEqual({
				size: {
					width: 24,
					height: 24
				}
			});

			// Not registered so an error is thrown
			expect(() => this.meta(Focus).set('root')).toThrowError("Method 'set' not registered for meta Focus");

			// Block meta is called with options (is actually calling mockTestBlock)
			this.meta(Block).run(testBlock)({ locale: 'en' });

			// A non-registered function is called for Block meta, resulting in an error
			expect(() => this.meta(Block).run(otherTestBlock)).toThrowError(
				'Arguements function otherTestBlock() { } not registered for Block.run()'
			);

			// Call two to Block meta for testBlock
			this.meta(Block).run(testBlock)({ locale: 'fr' });

			return <div key="root" />;
		}
	}

	test('registerMetaCall', () => {
		const mockMetaMixin = new MockMetaMixin(MetaWidget);

		// Register 'get' method to always return the same value no matter the number of calls
		mockMetaMixin.registerMetaCall(Focus, 'get', ['root'], {
			active: true,
			containsFocus: true
		});

		// Overrides previous 'registerMetaCall' call
		mockMetaMixin.registerMetaCall(Focus, 'get', ['root'], {
			active: true,
			containsFocus: false
		});

		// Register a different meta for the same arguements
		mockMetaMixin.registerMetaCall(Dimensions, 'get', ['root'], {
			size: {
				width: 24,
				height: 24
			}
		});

		// Can use a function as an identifier (as Block requires)
		const mockTestBlock = jest.fn();
		mockMetaMixin.registerMetaCall(Block, 'run', [testBlock], mockTestBlock);

		const TestFocusWidget = mockMetaMixin.getClass();

		const h = harness(() => <TestFocusWidget />);
		h.expect(() => <div key="root" />);

		expect(mockTestBlock).toHaveBeenNthCalledWith(1, { locale: 'en' });
		expect(mockTestBlock).toHaveBeenNthCalledWith(2, { locale: 'fr' });
		expect(mockTestBlock).toHaveBeenCalledTimes(2);
	});

	class IntersectingMetaWidget extends WidgetBase {
		protected render() {
			const { isIntersecting } = this.meta(Intersection).get('root');

			const play = isIntersecting;

			return <div classes={play ? 'play' : 'pause'} />;
		}
	}

	test('automatic invalidation', () => {
		// Must use fake timers for proper testing
		jest.useFakeTimers();

		const mockMetaMixin = new MockMetaMixin(IntersectingMetaWidget);
		mockMetaMixin.registerMetaCallOnce(
			Intersection,
			'get',
			['root'],
			{
				isIntersecting: false
			},
			{
				isIntersecting: true
			}
		);

		const MockIntersectingMetaWidget = mockMetaMixin.getClass();

		const h = harness(() => <MockIntersectingMetaWidget />);
		h.expect(() => <div classes="pause" />);

		// Running the timer allows the widget to invalidate.
		jest.runAllTimers();
		h.expect(() => <div classes="play" />);
	});
});
