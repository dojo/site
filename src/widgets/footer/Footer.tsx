import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import * as css from './Footer.m.css';

export default class Footer extends WidgetBase {
	protected render() {
		return (
			<footer classes={[css.root]}>{`© ${new Date().getFullYear()} JS Foundation, All Rights Reserved.`}</footer>
		);
	}
}
