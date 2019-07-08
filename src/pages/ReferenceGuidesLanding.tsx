import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import I18nMixin from '@dojo/framework/core/mixins/I18n';

import { ReferenceGuide } from '../interface';
import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LandingLink from '../widgets/landing/LandingLink';

import bundle from './reference-guides/ReferenceGuides.nls';

export interface ReferenceGuidesProperties {
	referenceGuides: ReferenceGuide[];
}

export default class ReferenceGuidesLanding extends I18nMixin(WidgetBase)<ReferenceGuidesProperties> {
	protected render() {
		const { referenceGuides } = this.properties;
		const { messages } = this.localizeBundle(bundle);

		return (
			<Landing key="tutorials-landing">
				<LandingSubsection>
					<Grid>
						{referenceGuides.map((referenceGuide) => {
							const { name, description, to, icon } = referenceGuide;
							return (
								<LandingLink
									title={messages[name]}
									icon={icon}
									to={to}
									params={{ page: 'introduction' }}
								>
									{messages[description]}
								</LandingLink>
							);
						})}
					</Grid>
				</LandingSubsection>
			</Landing>
		);
	}
}
