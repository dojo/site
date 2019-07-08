import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import { ReferenceGuide } from '../../interface';

import ReferenceGuideView from '../ReferenceGuideView';

export interface ReferenceGuidesProperties {
	referenceGuides: ReferenceGuide[];
}

export default class ReferenceGuides extends WidgetBase<ReferenceGuidesProperties> {
	protected render() {
		const { referenceGuides } = this.properties;

		return referenceGuides.map((referenceGuide) => {
			const {
				to,
				name,
				path,
				repository: { name: repoName, branch }
			} = referenceGuide;

			return (
				<Outlet
					key={to}
					id={to}
					renderer={(matchDetails) => {
						const { page } = matchDetails.params;
						return (
							<ReferenceGuideView
								name={name}
								repo={repoName}
								branch={branch}
								path={path}
								route={to}
								page={page}
							/>
						);
					}}
				/>
			);
		});
	}
}
