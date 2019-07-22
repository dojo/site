import { tsx, create } from '@dojo/framework/core/vdom';

import LocalPage from '../page/LocalPage';
import Section from '../section/Section';

import TutorialMenu from './TutorialMenu';

export interface TutorialPageProperties {
	path: string;
}

const factory = create().properties<TutorialPageProperties>();

export default factory(function Tutorial({ properties }) {
	const { path } = properties();

	return (
		<Section>
			<TutorialMenu />
			<LocalPage path={path} />
		</Section>
	);
});
