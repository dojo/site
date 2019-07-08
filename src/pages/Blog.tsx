import Block from '@dojo/framework/core/meta/Block';
import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

import compileBlogIndexBlock from '../scripts/compile-blog-index.block';
import { BlogPost } from '../scripts/compile-blog-post.block';
import Landing from '../widgets/landing/Landing';

import Post from './BlogPost';
import * as css from './Blog.m.css';

export default class Blog extends WidgetBase {
	protected render() {
		const blogs: BlogPost[] = this.meta(Block).run(compileBlogIndexBlock)({ locale: 'en' }) as any;

		return (
			<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
				{blogs && blogs.map((blog: BlogPost) => <Post key={blog.file} post={blog} excerpt />)}
			</Landing>
		);
	}
}
