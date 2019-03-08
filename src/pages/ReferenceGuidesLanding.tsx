import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';

import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LandingLink from '../widgets/landing/LandingLink';

import bundle from './ReferenceGuidesLanding.nls';

export default class ReferenceGuidesLanding extends I18nMixin(WidgetBase) {
	protected render() {
		const { messages } = this.localizeBundle(bundle);

		return (
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
					</Grid>
				</LandingSubsection>
			</Landing>
		);
	}
}
