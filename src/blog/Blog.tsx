import Block from '@dojo/framework/core/meta/Block';
import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

import compileBlogIndexBlock from '../scripts/compile-blog-index.block';
import Landing from '../landing/Landing';

import Post from './BlogPost';
import * as css from './Blog.m.css';

export default class Blog extends WidgetBase {
	protected render() {
		const paths: any = this.meta(Block).run(compileBlogIndexBlock)({ locale: 'en' });

		return (
			<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
				{paths && paths.map((path: string) => <Post path={path} excerpt />)}
			</Landing>
		);
	}
}
