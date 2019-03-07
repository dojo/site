import { tsx } from '@dojo/framework/widget-core/tsx';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import Outlet from '@dojo/framework/routing/Outlet';
import harness from '@dojo/framework/testing/harness';

import ReferenceGuide from '../ReferenceGuide';

import ReferenceGuides from './ReferenceGuides';

interface Page {
	outlet: string;
	content: DNode;
	args?: any[];
}

describe('Tutorials', () => {
	it('renders', () => {
		const h = harness(() => <ReferenceGuides />);
		h.expect(() => [
			<Outlet
				key="reference-guide-i18n"
				id="reference-guide-i18n"
				renderer={(matchDetails) => {
					const { page } = matchDetails.params;
					return (
						<ReferenceGuide
							repo="dojo/framework"
							path="docs/:locale:/i18n/index.md"
							route="reference-guide-i18n"
							page={page}
						/>
					);
				}}
			/>
		]);
	});

	const pages: Page[] = [
		{
			outlet: 'reference-guide-i18n',
			content: (
				<ReferenceGuide
					repo="dojo/framework"
					path="docs/:locale:/i18n/index.md"
					route="reference-guide-i18n"
					page="introduction"
				/>
			),
			args: [
				{
					params: { page: 'introduction' }
				}
			]
		}
	];

	it('outlets render contents', () => {
		const h = harness(() => <ReferenceGuides />);
		pages.forEach(({ outlet, content, args = [] }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer', ...args);
			h.expect(() => content, () => renderer);
		});
	});
});
