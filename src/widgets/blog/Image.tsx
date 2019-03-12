import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

interface ImageProperties {
	alt?: string;
	height?: number;
	path: string;
	width?: number;
}

export default class Image extends WidgetBase<ImageProperties> {
	render() {
		const { alt, height, path, width } = this.properties;
		return <img alt={alt} height={height} src={`/assets/blog/${path}`} width={width} />;
	}
}
