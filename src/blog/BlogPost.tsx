import WidgetBase from '@dojo/framework/core/WidgetBase';
import Block from '@dojo/framework/core/meta/Block';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import post from './post.block';

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
		const result: any = this.meta(Block).run(post)({
			excerpt,
			path
		});

		if (result) {
			const resultContent = [
				<p classes={css.meta}>{`${result.meta.author} ${formatDate(result.meta.date)}`}</p>,
				result.content
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
						<h1 classes={css.header}>{result.meta.title}</h1>
						{resultContent}
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
						<h1 classes={css.header}>{result.meta.title}</h1>
					</Link>
					{resultContent}
					{readMoreLink}
				</LandingSubsection>
			);
		}
	}
}
