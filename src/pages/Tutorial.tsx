import { create, tsx } from '@dojo/framework/core/vdom';

import LocalPage from '../widgets/page/LocalPage';
import Section from '../widgets/section/Section';

import TutorialMenu from './tutorials/TutorialMenu';

export interface TutorialPageProperties {
	path: string;
}

const factory = create().properties<TutorialPageProperties>();

export default factory(function Tutorial({ properties: { path } }) {
	return (
		<Section>
			<TutorialMenu />
			<LocalPage path={path} />
		</Section>
	);
});
