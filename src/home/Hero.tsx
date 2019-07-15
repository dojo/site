import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import * as css from './Hero.m.css';
const hero = require('../assets/herobg.png');

export default class Hero extends WidgetBase {
	protected render() {
		return (
			<section styles={{ backgroundImage: `url(${hero})` }} classes={[css.root]}>
				<h1 classes={[css.headline]}>A Progressive Framework for Modern Web Apps</h1>
				<button classes={[css.build]}>Build with Dojo</button>
			</section>
		);
	}
}
