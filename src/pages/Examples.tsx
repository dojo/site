import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LinkedCard from '../widgets/card/LinkedCard';
import getExamples from '../scripts/examples.block';

import * as css from './Examples.m.css';

const factory = create({ block });

export default factory(function Examples({ middleware: { block } }) {
	const examples = block.run(getExamples)();

	return (
		<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
			<LandingSubsection>
				<h2>Examples</h2>
				<Grid>
					{examples &&
						examples.map((example) => (
							<div key={example.exampleName} classes={css.card}>
								<LinkedCard
									classes={{ 'dojo.io/Card': { content: [css.cardContent] } }}
									footer={
										<div classes={css.footer}>
											{example.sandbox && (
												<a
													href={`https://codesandbox.io/s/github/dojo/examples/tree/master/${example.exampleName}`}
													target="_blank"
													classes={css.linkBtn}
												>
													<FontAwesomeIcon icon="laptop-code" />
												</a>
											)}
											<a
												href={`https://github.com/dojo/examples/tree/master/${example.exampleName}`}
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
												backgroundImage: `url(https://github.com/dojo/examples/raw/master/${example.exampleName}/preview.png)`
											}}
										/>
									}
									url={example.demo}
								>
									<h4 classes={css.title}>{example.example.children}</h4>
									{example.overview.children}
								</LinkedCard>
							</div>
						))}
				</Grid>
			</LandingSubsection>
		</Landing>
	);
});
