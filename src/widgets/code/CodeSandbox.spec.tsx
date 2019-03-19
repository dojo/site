import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { w } from '@dojo/framework/widget-core/d';
import { add } from '@dojo/framework/has/has';
import { Constructor, MetaBase, WidgetMetaConstructor } from '@dojo/framework/widget-core/interfaces';
import { Intersection } from '@dojo/framework/widget-core/meta/Intersection';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

import CodeSandbox from './CodeSandbox';
import * as css from './CodeSandbox.m.css';

const noop: any = () => {};

export const stubEvent = {
	stopPropagation: noop,
	preventDefault: noop,
	target: {}
};

const mockMetaMixin = <T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: jest.Mock): T => {
	return class extends Base {
		protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
			return mockStub(MetaType);
		}
	};
};

describe('CodeSandbox', () => {
	it('renders', () => {
		add('build-time-render', false, true);
		const url = 'https://codesandbox.io/embed/dummy';

		const mockMeta = jest.fn().mockImplementation((input: any) => {
			if (Intersection) {
					return {
							get: mockIntersectionGet
					};
			}
		});

		const mockIntersectionGet = jest
			.fn()
			.mockReturnValueOnce({ isIntersecting: false })
			.mockReturnValueOnce({ isIntersecting: true });

		const h = harness(() => w(mockMetaMixin(CodeSandbox, mockMeta), { url }));
		h.expect(() => (
			<div key="root" classes={[css.root]}>
				<iframe classes={[css.root]} src="" />
			</div>
		));

		const h2 = harness(() => w(mockMetaMixin(CodeSandbox, mockMeta), { url }));
		h2.expect(() => (
			<div key="root" classes={[css.root]}>
				<iframe classes={[css.root]} src={`${url}?autoresize=1&hidenavigation=1`} />
			</div>
		));
	});

	it('does not render during build-time-rendering', () => {

		add('build-time-render', true, true);
		const url = 'https://codesandbox.io/embed/dummy';

		const h = harness(() => <CodeSandbox url={url} />);
		h.expect(() => undefined);
	});
});
