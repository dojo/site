import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { switchLocale } from '@dojo/framework/i18n/i18n';

import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import Grid from '../widgets/grid/Grid';
import LandingLink from '../widgets/landing/LandingLink';

import * as compiler from '../scripts/compile-remote.block';
import Alert from '../widgets/content/Alert';

import bundle from './ReferenceGuidesLanding.nls';
import ReferenceGuidesLanding from './ReferenceGuidesLanding';

describe('ReferenceGuidesLanding', () => {
	const mockRemoteCompiler = jest.spyOn(compiler, 'default');

	switchLocale('en-US');

	const messages = bundle.messages;

	const baseAssertion = assertionTemplate(() => (
		<Landing key="tutorials-landing">
			<LandingSubsection>
				<Grid>
					<LandingLink
						{...{ '~key': 'i18nLink' }}
						title={messages.i18n}
						icon="globe"
						to="reference-guide-i18n"
						params={{ page: 'introduction' }}
					>
						{messages.i18nDescription}
					</LandingLink>
				</Grid>
			</LandingSubsection>
		</Landing>
	));

	it('renders', () => {
		mockRemoteCompiler.mockReturnValueOnce((
			<ul>
				{undefined}
				<li />
				<li>
					<a href="https://example.com">Absolute link</a>
				</li>
				<Alert>Random Widget</Alert>
				<li>
					<a href="./introduction">Introduction</a>
				</li>
				<li>
					<a href="./basic-usage">Basic Usage</a>
				</li>
			</ul>
		) as any);

		const h = harness(() => <ReferenceGuidesLanding />);

		h.expect(baseAssertion);

		expect(mockRemoteCompiler).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			path: 'docs/:locale:/i18n/index.md',
			locale: 'en-US'
		});
	});

	it('renders empty when compiler response is undefined', () => {
		mockRemoteCompiler.mockReturnValueOnce(undefined as any);

		const h = harness(() => <ReferenceGuidesLanding />);

		const assertion = baseAssertion.setProperty('~i18nLink', 'params', { page: '' });
		h.expect(assertion);

		expect(mockRemoteCompiler).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			path: 'docs/:locale:/i18n/index.md',
			locale: 'en-US'
		});
	});
});
