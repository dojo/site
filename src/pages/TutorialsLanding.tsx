import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import I18nMixin from '@dojo/framework/core/mixins/I18n';

import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LandingLink from '../widgets/landing/LandingLink';

import bundle from './TutorialsLanding.nls';

export default class TutorialsLanding extends I18nMixin(WidgetBase) {
	protected render() {
		const { messages } = this.localizeBundle(bundle);

		return (
			<Landing key="tutorials-landing">
				<LandingSubsection title={messages.gettingStarted}>
					<Grid>
						<LandingLink
							title={messages.localInstllation}
							icon="cloud-download-alt"
							to="tutorial-local-installation"
						>
							{messages.localInstllationDescription}
						</LandingLink>
						<LandingLink
							title={messages.sampleTutorial}
							icon="graduation-cap"
							color="orange"
							to="tutorial-sample-tutorial"
						>
							{messages.sampleTutorialDescription}
						</LandingLink>
					</Grid>
				</LandingSubsection>
				<LandingSubsection title={messages.advanced}>
					<Grid>
						<LandingLink
							title={messages.anotherTutorial}
							icon="list-alt"
							color="purple"
							to="tutorial-another-tutorial"
						>
							{messages.anotherTutorialDescription}
						</LandingLink>
					</Grid>
				</LandingSubsection>
			</Landing>
		);
	}
}
