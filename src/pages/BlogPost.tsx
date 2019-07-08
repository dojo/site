import WidgetBase from '@dojo/framework/core/WidgetBase';
import Block from '@dojo/framework/core/meta/Block';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import compileBlogPostBlock, { BlogPost } from '../scripts/compile-blog-post.block';

import LandingSubsection from '../widgets/landing/LandingSubsection';
import Page from '../widgets/page/Page';

import * as css from './BlogPost.m.css';

export interface PostProperties {
	excerpt?: boolean;
	standalone?: boolean;
	path?: string;
	post?: BlogPost;
}

export function formatDate(date: string) {
	let d = new Date(date);
	const options = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit'
	};

	return new Intl.DateTimeFormat('en-US', options).format(d);
}

export default class Post extends WidgetBase<PostProperties> {
	protected render() {
		let { post } = this.properties;
		const { excerpt = false, standalone = false, path } = this.properties;

		if (!post && path) {
			post = this.meta(Block).run(compileBlogPostBlock)({
				excerpt,
				path
			}) as any;
		}

		if (post) {
			const postContent = [
				<p classes={css.meta}>{`${post.meta.author} ${formatDate(post.meta.date as string)}`}</p>,
				post.content
			];

			const readMoreLink = excerpt && (
				<p>
					<Link
						to="blog-post"
						params={{
							path: post.file.replace('blog/en/', '').replace('.md', '')
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
							path: post.file.replace('blog/en/', '').replace('.md', '')
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
