import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

import * as css from './Home.m.css';

import Ethos from './Ethos';
import Hero from './Hero';
import Features from './Features';
import GetGoing from './GetGoing';

export default class Home extends WidgetBase {
	protected render() {
		return (
			<main classes={[css.root]}>
				<Hero />
				<Ethos />
				<GetGoing />
				<Features />
			</main>
		);
	}
}
