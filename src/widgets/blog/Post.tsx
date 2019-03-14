import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';
import i18n from '@dojo/framework/i18n/i18n';
import Link from '@dojo/framework/routing/Link';

import compiler from '../../scripts/compile-blog-post.block';

import LandingSubsection from '../landing/LandingSubsection';

export interface PostProperties {
	excerpt?: boolean;
	path: string;
}

export default class Post extends WidgetBase<PostProperties> {
	protected render() {
		const { excerpt, path } = this.properties;
		const post: any = this.meta(Block).run(compiler)({
			excerpt,
			locale: i18n.locale,
			path
		});

		return (
			post && (
				<LandingSubsection title={post.meta.title}>
					<p>
						{post.meta.author} {post.meta.date}
					</p>
					{post.content}
					<p>
						{/* TODO: Make this real after configuring individual post routing */}
						<Link to="some-outlet" params={undefined}>
							READ MORE
						</Link>
					</p>
				</LandingSubsection>
			)
		);
	}
}
