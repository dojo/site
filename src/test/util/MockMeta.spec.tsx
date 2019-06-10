import harness from '@dojo/framework/testing/harness';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Focus from '@dojo/framework/widget-core/meta/Focus';
import Dimensions from '@dojo/framework/widget-core/meta/Dimensions';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';

import { MockMetaMixin } from './MockMeta';

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

		const TestFocusWidget = mockMetaMixin.getClass();

		const h = harness(() => <TestFocusWidget />);
		h.expect(() => <div key="root" />);
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

		const TestFocusWidget = mockMetaMixin.getClass();

		const h = harness(() => <TestFocusWidget />);
		h.expect(() => <div key="root" />);
	});
});
