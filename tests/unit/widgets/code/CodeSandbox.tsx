import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { exists, add } from '@dojo/framework/has/has';
import { Constructor, WidgetMetaBase, WidgetMetaConstructor } from '@dojo/framework/widget-core/interfaces';
import { Intersection } from '@dojo/framework/widget-core/meta/Intersection';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { stub, SinonStub } from 'sinon';

const { describe, it } = intern.getInterface('bdd');

import CodeSandbox from '../../../../src/widgets/code/CodeSandbox';
import * as css from '../../../../src/widgets/code/CodeSandbox.m.css';
import { w } from '@dojo/framework/widget-core/d';

const noop: any = () => {};

export const stubEvent = {
	stopPropagation: noop,
	preventDefault: noop,
	target: {}
};

const mockMetaMixin = <T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: SinonStub): T => {
	return class extends Base {
		protected meta<T extends WidgetMetaBase>(MetaType: WidgetMetaConstructor<T>): T {
			return mockStub(MetaType);
		}
	};
}

describe('CodeSandbox', () => {
	it('renders', () => {
		const url = 'https://codesandbox.io/embed/dummy';

		const h = harness(() => <CodeSandbox url={url} />);
		h.expect(() => (
			<div key="root" classes={[css.root]}>
				<iframe classes={[css.root]} src={`${url}?autoresize=1&hidenavigation=1`} />
			</div>
		));
	});

	it('renders with build-time-render', () => {
		const mockMeta = stub();
		const mockIntersectionGet = stub();
		mockIntersectionGet.onFirstCall().returns({ isIntersecting: false });
		mockIntersectionGet.onSecondCall().returns({ isIntersecting: true });
		mockMeta.withArgs(Intersection).returns({
			get: mockIntersectionGet
		});

		if (!exists('build-time-render')) {
			add('build-time-render', false, false);
		}
		
		const url = 'https://codesandbox.io/embed/dummy';

		const h = harness(() => w(mockMetaMixin(CodeSandbox, mockMeta), { url }));
		h.expect(() => (
			<div key="root" classes={[css.root]}>
				<iframe classes={[css.root]} src='' />
			</div>
		));

		const h2 = harness(() => w(mockMetaMixin(CodeSandbox, mockMeta), { url }));
		h2.expect(() => (
			<div key="root" classes={[css.root]}>
				<iframe classes={[css.root]} src={`${url}?autoresize=1&hidenavigation=1`} />
			</div>
		));
	});
});
