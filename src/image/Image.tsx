import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Image.m.css';

interface ImageProperties {
	alt?: string;
	height?: number;
	path: string;
	width?: number;
}

const factory = create({ theme }).properties<ImageProperties>();

export default factory(function Image({ middleware: { theme }, properties }) {
	const { alt, height, path, width } = properties();
	const themedCss = theme.classes(css);
	return <img classes={themedCss.root} alt={alt} height={height} src={`/assets/blog/${path}`} width={width} />;
});
