import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { switchLocale } from '@dojo/framework/i18n/i18n';

import { ReferenceGuide } from '../interface';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import Grid from '../widgets/grid/Grid';
import LandingLink from '../widgets/landing/LandingLink';

import bundle from './reference-guides/ReferenceGuides.nls';
import ReferenceGuidesLanding from './ReferenceGuidesLanding';

describe('ReferenceGuidesLanding', () => {
	switchLocale('en-US');

	const messages = bundle.messages;

	const referenceGuide1: ReferenceGuide = {
		name: 'i18n',
		description: 'i18nDescription',
		icon: 'globe',
		to: 'reference-guide-i18n',
		repository: {
			name: 'dojo/framework'
		},
		path: 'docs/:locale:/i18n'
	};

	const referenceGuide2: ReferenceGuide = {
		name: 'stylingAndTheming',
		description: 'stylingAndThemingDescription',
		icon: 'palette',
		to: 'reference-guide-styling-and-theming',
		repository: {
			name: 'dojo/framework',
			branch: 'someOtherBranch'
		},
		path: 'docs/:locale:/styling-and-theming'
	};

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
				</Grid>
			</LandingSubsection>
		</Landing>
	));

	it('renders', () => {
		const h = harness(() => <ReferenceGuidesLanding referenceGuides={[referenceGuide1, referenceGuide2]} />);

		h.expect(baseAssertion);
	});
});
