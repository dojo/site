import { tsx, create } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';

import Grid from '../grid/Grid';
import Landing from '../landing/Landing';
import LandingSubsection from '../landing/LandingSubsection';
import LandingLink from '../landing/LandingLink';

import bundle from './TutorialsLanding.nls';

const factory = create({ i18n });

export default factory(function TutorialsLanding({ middleware: { i18n } }) {
	const { messages } = i18n.localize(bundle);

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
});
