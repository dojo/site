import block from '@dojo/framework/core/middleware/block';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import { createMockBlockMiddleware } from '../test/util/mockBlock';
import getExamples from '../scripts/examples.block';
import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LinkedCard from '../widgets/card/LinkedCard';

import Examples from './Examples';
import * as css from './Examples.m.css';

describe('Examples', () => {
	it('renders', () => {
		const mockGetExample = jest.fn().mockReturnValue([
			{
				code: 'code',
				demo: 'demo',
				example: 'example',
				exampleName: 'name',
				overview: 'overview',
				sandbox: true
			}
		]);
		const mockBlock = createMockBlockMiddleware([[getExamples, mockGetExample]]);
		const h = harness(() => <Examples />, { middleware: [[block, mockBlock]] });
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

		expect(mockGetExample).toHaveBeenCalled();
	});
});
