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
							name="i18n"
							repo="dojo/framework"
							path="docs/:locale:/i18n"
							route="reference-guide-i18n"
							page={page}
						/>
					);
				}}
			/>,
			<Outlet
				key="reference-guide-styling-and-theming"
				id="reference-guide-styling-and-theming"
				renderer={(matchDetails) => {
					const { page } = matchDetails.params;
					return (
						<ReferenceGuide
							name="styling-and-theming"
							repo="dojo/framework"
							path="docs/:locale:/styling-and-theming"
							route="reference-guide-styling-and-theming"
							page={page}
						/>
					);
				}}
			/>,
			<Outlet
				key="reference-guide-routing"
				id="reference-guide-routing"
				renderer={(matchDetails) => {
					const { page } = matchDetails.params;
					return (
						<ReferenceGuide
							name="routing"
							repo="dojo/framework"
							path="docs/:locale:/routing"
							route="reference-guide-routing"
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
					name="i18n"
					repo="dojo/framework"
					path="docs/:locale:/i18n"
					route="reference-guide-i18n"
					page="introduction"
				/>
			),
			args: [
				{
					params: { page: 'introduction' }
				}
			]
		},
		{
			outlet: 'reference-guide-styling-and-theming',
			content: (
				<ReferenceGuide
					name="Styling and Theming"
					repo="dojo/framework"
					path="docs/:locale:/styling-and-theming"
					route="reference-guide-styling-and-theming"
					page="introduction"
				/>
			),
			args: [
				{
					params: { page: 'introduction' }
				}
			]
		},
		{
			outlet: 'reference-guide-routing',
			content: (
				<ReferenceGuide
					name="Routing"
					repo="dojo/framework"
					path="docs/:locale:/routing"
					route="reference-guide-routing"
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
