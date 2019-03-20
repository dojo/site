import Block from '@dojo/framework/widget-core/meta/Block';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LinkedCard from '../widgets/card/LinkedCard';
import getExamples, { ExampleMeta } from '../scripts/examples.block';

import * as css from './Examples.m.css';

export default class Examples extends WidgetBase {
	private renderCardHeader = ({ exampleName }: ExampleMeta) => (
		<div
			classes={css.header}
			styles={{
				backgroundImage: `url(https://github.com/dojo/examples/raw/master/${exampleName}/preview.png)`
			}}
		/>
	);

	private renderCardFooter = ({ exampleName, sandbox }: ExampleMeta) => (
		<div classes={css.footer}>
			{sandbox && (
				<a
					href={`https://codesandbox.io/s/github/dojo/examples/tree/master/${exampleName}`}
					classes={css.linkBtn}
				>
					<FontAwesomeIcon icon="laptop-code" />
				</a>
			)}
			<a href={`https://github.com/dojo/examples/tree/master/${exampleName}`} classes={css.linkBtn}>
				<FontAwesomeIcon icon="code-branch" />
			</a>
		</div>
	);

	protected render() {
		const examples: ExampleMeta[] = (this.meta(Block).run(getExamples)() as any);

		return (
			<Landing>
				<LandingSubsection>
					<h2>Examples</h2>
					<Grid>
						{examples && examples.map((example) => {
							return (
								<div key={example.exampleName} classes={css.card}>
									<LinkedCard
										footer={this.renderCardFooter(example)}
										header={this.renderCardHeader(example)}
										url={example.demo}
									>
										<h4 classes={css.title}>{example.example.children}</h4>
										{example.overview.children}
									</LinkedCard>
								</div>
							);
						})}
					</Grid>
				</LandingSubsection>
			</Landing>
		);
	}
}
