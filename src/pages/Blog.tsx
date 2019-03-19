import Block from '@dojo/framework/widget-core/meta/Block';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compileBlogIndexBlock from '../scripts/compile-blog-index.block';
import Landing from '../widgets/landing/Landing';
import Post from './BlogPost';

export default class Blog extends WidgetBase {
	protected render() {
		const paths: any = this.meta(Block).run(compileBlogIndexBlock)({ locale: 'en' });

		return <Landing>{paths && paths.map((path: string) => <Post path={path} excerpt />)}</Landing>;
	}
}
