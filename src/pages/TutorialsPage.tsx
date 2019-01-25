import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Section from '../widgets/section/Section';

interface TutorialsPageProperties {
	page: string;
}

export default class Blog extends WidgetBase<TutorialsPageProperties> {
	protected render() {
		const { page } = this.properties;

		return <Section key="section-tutorials" section="tutorials" path={`tutorials/${page}`} />;
	}
}
