import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

export interface MetadataProperties {
	[key: string]: string;
}

export default class Metadata extends WidgetBase<MetadataProperties> {
	render() {
		const rows = Object.keys(this.properties).map((key) => {
			return (
				<tr>
					<td>{key}</td>
					<td>{this.properties[key]}</td>
				</tr>
			);
		});
		return <table>{rows}</table>;
	}
}
