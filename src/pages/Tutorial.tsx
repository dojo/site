import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import LocalPage from '../widgets/page/LocalPage';
import Section from '../widgets/section/Section';

import TutorialMenu from './tutorials/TutorialMenu';

export interface TutorialPageProperties {
	path: string;
}

export default class Tutorial extends WidgetBase<TutorialPageProperties> {
	protected render() {
		const { path } = this.properties;

		return (
			<Section>
				<TutorialMenu />
				<LocalPage path={path} />
			</Section>
		);
	}
}
