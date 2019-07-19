import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';
import Link from '@dojo/framework/routing/Link';

import LandingSubsection from '../landing/LandingSubsection';
import Page from '../page/Page';

import postBlock from './post.block';

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

const factory = create({ block }).properties<PostProperties>();

export default factory(function BlogPost({ middleware: { block }, properties }) {
	const { excerpt = false, standalone = false, path } = properties();
	const result = block(postBlock)({
		excerpt,
		path
	});

	if (result) {
		const resultContent = [
			<p classes={css.meta}>{`${result.meta.author} ${formatDate(result.meta.date as string)}`}</p>,
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
});
