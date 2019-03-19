import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './Image.m.css';

interface ImageProperties extends ThemedProperties {
	alt?: string;
	height?: number;
	path: string;
	width?: number;
}

@theme(css)
export default class Image extends ThemedMixin(WidgetBase)<ImageProperties> {
	render() {
		const { alt, height, path, width } = this.properties;
		 return (
			<img classes={this.theme(css.root)} alt={alt} height={height} src={`/assets/blog/${path}`} width={width} />
		);
	}
}
