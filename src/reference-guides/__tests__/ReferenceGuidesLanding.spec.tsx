import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { switchLocale } from '@dojo/framework/i18n/i18n';

import Landing from '../../landing/Landing';
import LandingSubsection from '../../landing/LandingSubsection';
import Grid from '../../grid/Grid';
import LandingLink from '../../landing/LandingLink';

import bundle from '../ReferenceGuidesLanding.nls';
import ReferenceGuidesLanding from '../ReferenceGuidesLanding';

describe('ReferenceGuidesLanding', () => {
	switchLocale('en-US');

	const messages = bundle.messages;

	const baseAssertion = assertionTemplate(() => (
		<Landing key="tutorials-landing">
			<LandingSubsection>
				<Grid>
					<LandingLink
						title={messages.i18n}
						icon="globe"
						to="reference-guide-i18n"
						params={{ page: 'introduction' }}
					>
						{messages.i18nDescription}
					</LandingLink>
					<LandingLink
						title={messages.stylingAndTheming}
						icon="palette"
						to="reference-guide-styling-and-theming"
						params={{ page: 'introduction' }}
					>
						{messages.stylingAndThemingDescription}
					</LandingLink>
					<LandingLink
						title={messages.routing}
						icon="sitemap"
						to="reference-guide-routing"
						params={{ page: 'introduction' }}
					>
						{messages.routingDescription}
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
