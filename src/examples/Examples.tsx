import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import Grid from '../grid/Grid';
import Landing from '../landing/Landing';
import LandingSubsection from '../landing/LandingSubsection';
import LinkedCard from '../card/LinkedCard';
import listBlock from './list.block';

import * as css from './Examples.m.css';

const factory = create({ block });

export default factory(function Examples({ middleware: { block } }) {
	const examples = block(listBlock)();

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
									header={
										<div
											classes={css.header}
											styles={{
												backgroundImage: `url(https://github.com/dojo/examples/raw/master/${example.exampleName}/preview.png)`
											}}
										/>
									}
									footer={
										<div classes={css.footer}>
											{example.sandbox && (
												<a
													href={`https://codesandbox.io/s/github/dojo/examples/tree/master/${example.exampleName}`}
													target="_blank"
													rel="noopener noreferrer"
													classes={css.linkBtn}
												>
													<span>codesandbox.io</span>
												</a>
											)}
											<a
												href={`https://github.com/dojo/examples/tree/master/${example.exampleName}`}
												target="_blank"
												rel="noopener noreferrer"
												classes={css.linkBtn}
											>
												<span>GitHub</span>
											</a>
										</div>
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
