import { tsx } from '@dojo/framework/core/vdom';
import { DNode } from '@dojo/framework/core/interfaces';
import Outlet from '@dojo/framework/routing/Outlet';
import harness from '@dojo/framework/testing/harness';

import { ReferenceGuide } from '../../interface';

import ReferenceGuideView from '../ReferenceGuideView';

import ReferenceGuides from './ReferenceGuides';

interface Page {
	outlet: string;
	content: DNode;
	args?: any[];
}

describe('Tutorials', () => {
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

	it('renders', () => {
		const h = harness(() => <ReferenceGuides referenceGuides={[referenceGuide1, referenceGuide2]} />);
		h.expect(() => [
			<Outlet
				key="reference-guide-i18n"
				id="reference-guide-i18n"
				renderer={(matchDetails) => {
					const { page } = matchDetails.params;
					return (
						<ReferenceGuideView
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
						<ReferenceGuideView
							name="styling-and-theming"
							repo="dojo/framework"
							path="docs/:locale:/styling-and-theming"
							route="reference-guide-styling-and-theming"
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
				<ReferenceGuideView
					name="i18n"
					repo="dojo/framework"
					branch={undefined}
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
				<ReferenceGuideView
					name="stylingAndTheming"
					repo="dojo/framework"
					branch="someOtherBranch"
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
		}
	];

	it('outlets render contents', () => {
		const h = harness(() => <ReferenceGuides referenceGuides={[referenceGuide1, referenceGuide2]} />);
		pages.forEach(({ outlet, content, args = [] }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer', ...args);
			h.expect(() => content, () => renderer);
		});
	});
});
