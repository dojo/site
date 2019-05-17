import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { switchLocale } from '@dojo/framework/i18n/i18n';

import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import Grid from '../widgets/grid/Grid';
import LandingLink from '../widgets/landing/LandingLink';

import bundle from './ReferenceGuidesLanding.nls';
import ReferenceGuidesLanding from './ReferenceGuidesLanding';

describe('ReferenceGuidesLanding', () => {
	switchLocale('en-US');

	const messages = bundle.messages;

	const baseAssertion = assertionTemplate(() => (
		<Landing key="tutorials-landing">
			<LandingSubsection>
				<Grid>
					<LandingLink
						assertion-key="i18nLink"
						title={messages.i18n}
						icon="globe"
						to="reference-guide-i18n"
						params={{ page: 'introduction' }}
					>
						{messages.i18nDescription}
					</LandingLink>
					<LandingLink
						assertion-key="stylingAndThemingLink"
						title={messages.stylingAndTheming}
						icon="palette"
						to="reference-guide-styling-and-theming"
						params={{ page: 'introduction' }}
					>
						{messages.stylingAndThemingDescription}
					</LandingLink>
				</Grid>
			</LandingSubsection>
		</Landing>
	));

	it('renders', () => {
		const h = harness(() => <ReferenceGuidesLanding />);

		h.expect(baseAssertion);
	});
});
