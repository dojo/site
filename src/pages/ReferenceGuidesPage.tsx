import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Section from '../widgets/section/Section';

interface ReferenceGuidesPageProperties {
	page: string;
}

export default class ReferenceGuidesPage extends WidgetBase<ReferenceGuidesPageProperties> {
	protected render() {
		const { page } = this.properties;

		return <Section key="section-reference-guides" section="reference-guides" path={`reference-guides/${page}`} />;
	}
}
