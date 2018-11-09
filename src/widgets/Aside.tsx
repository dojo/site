import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

const AsideStyles = {
	color: 'rgba(255, 255, 255, 0.7)',
	padding: '15px',
	'margin-top': '40px !important',
	'margin-bottom': '40px',
	background: '#222',
	'font-size': '0.9em',
	'border-left': '10px solid #faa05a'
};

interface AsideProperties {
	title: string;
}

export default class Aside extends WidgetBase<AsideProperties> {
	render() {
		const { title } = this.properties;
		return (
			<article styles={AsideStyles}>
				<strong>{title}</strong>
				<p>{this.children}</p>
			</article>
		);
	}
}
