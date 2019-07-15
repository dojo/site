import WidgetBase from '@dojo/framework/core/WidgetBase';
import Block from '@dojo/framework/core/meta/Block';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import compileBlogPostBlock from '../scripts/compile-blog-post.block';

import LandingSubsection from '../landing/LandingSubsection';
import Page from '../page/Page';

import * as css from './BlogPost.m.css';

export interface PostProperties {
	excerpt?: boolean;
	standalone?: boolean;
	path: string;
}

export function formatDate(date: string) {
	let d = new Date(date);
	const options = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	};

	return new Intl.DateTimeFormat('en-US', options).format(d);
}

export default class Post extends WidgetBase<PostProperties> {
	protected render() {
		const { excerpt = false, standalone = false, path } = this.properties;
		const post: any = this.meta(Block).run(compileBlogPostBlock)({
			excerpt,
			path
		});

		if (post) {
			const postContent = [
				<p classes={css.meta}>{`${post.meta.author} ${formatDate(post.meta.date)}`}</p>,
				post.content
			];

			const readMoreLink = excerpt && (
				<p>
					<Link
						to="blog-post"
						params={{
							path: path.replace('blog/en/', '').replace('.md', '')
						}}
						classes={css.readMoreLink}
					>
						READ MORE
					</Link>
				</p>
			);

			if (standalone) {
				return (
					<Page classes={{ 'dojo.io/Page': { root: [css.root] } }}>
						<h1 classes={css.header}>{post.meta.title}</h1>
						{postContent}
						{readMoreLink}
					</Page>
				);
			}

			return (
				<LandingSubsection classes={{ 'dojo.io/LandingSubsection': { root: [css.root] } }}>
					<Link
						to="blog-post"
						params={{
							path: path.replace('blog/en/', '').replace('.md', '')
						}}
						classes={css.headerLink}
					>
						<h1 classes={css.header}>{post.meta.title}</h1>
					</Link>
					{postContent}
					{readMoreLink}
				</LandingSubsection>
			);
		}
	}
}
