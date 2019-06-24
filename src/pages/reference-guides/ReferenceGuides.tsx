import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import ReferenceGuide from '../ReferenceGuide';

export default class ReferenceGuides extends WidgetBase {
	protected render() {
		return [
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
							name="Styling and Theming"
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
							name="Routing"
							repo="dojo/framework"
							path="docs/:locale:/routing"
							route="reference-guide-routing"
							page={page}
						/>
					);
				}}
			/>
		];
	}
}
