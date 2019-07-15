import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

import Post from './BlogPost';
import Outlet from '@dojo/framework/routing/Outlet';

export default class BlogPosts extends WidgetBase {
	protected render() {
		return (
			<Outlet
				key="blog-post"
				id="blog-post"
				renderer={(matchDetails) => {
					const path = `blog/en/${matchDetails.params.path}.md`;
					return <Post path={path} standalone />;
				}}
			/>
		);
	}
}
