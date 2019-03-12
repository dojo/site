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
							repo="dojo/framework"
							path="docs/:locale:/i18n"
							route="reference-guide-i18n"
							page={page}
						/>
					);
				}}
			/>
		];
	}
}
