import Block from '@dojo/framework/core/meta/Block';
import WidgetBase from '@dojo/framework/core/WidgetBase';
import harness from '@dojo/framework/testing/harness';
import { Constructor, WidgetMetaConstructor, MetaBase } from '@dojo/framework/core/interfaces';
import { tsx } from '@dojo/framework/core/vdom';

import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LinkedCard from '../widgets/card/LinkedCard';

import Examples from './Examples';
import * as css from './Examples.m.css';

const mockMetaMixin = <T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: jest.Mock): T => {
	return class extends Base {
		protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
			return mockStub(MetaType);
		}
	};
};

const mockExamplesBlock = jest.fn();

const mockBlockRun = jest.fn().mockImplementation((input: any) => {
	return mockExamplesBlock;
});

const mockMeta = jest.fn().mockImplementation((input: any) => {
	if (Block) {
		return {
			run: mockBlockRun
		};
	}
});

describe('Examples', () => {
	it('renders', () => {
		mockExamplesBlock.mockReturnValueOnce([
			{
				code: 'code',
				demo: 'demo',
				example: 'example',
				exampleName: 'name',
				overview: 'overview',
				sandbox: true
			}
		]);
		const ExamplesMock = mockMetaMixin(Examples, mockMeta);
		const h = harness(() => <ExamplesMock />);
		h.expect(() => (
			<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
				<LandingSubsection>
					<h2>Examples</h2>
					<Grid>
						<div key="name" classes={css.card}>
							<LinkedCard
								classes={{ 'dojo.io/Card': { content: [css.cardContent] } }}
								footer={
									<div classes={css.footer}>
										<a
											href="https://codesandbox.io/s/github/dojo/examples/tree/master/name"
											target="_blank"
											classes={css.linkBtn}
										>
											<FontAwesomeIcon icon="laptop-code" />
										</a>
										<a
											href="https://github.com/dojo/examples/tree/master/name"
											target="_blank"
											classes={css.linkBtn}
										>
											<FontAwesomeIcon icon="code-branch" />
										</a>
									</div>
								}
								header={
									<div
										classes={css.header}
										styles={{
											backgroundImage:
												'url(https://github.com/dojo/examples/raw/master/name/preview.png)'
										}}
									/>
								}
								url="demo"
							>
								<h4 classes={css.title} />
							</LinkedCard>
						</div>
					</Grid>
				</LandingSubsection>
			</Landing>
		));
	});
});
