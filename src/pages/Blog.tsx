import Block from '@dojo/framework/widget-core/meta/Block';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import i18n from '@dojo/framework/i18n/i18n';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Landing from '../widgets/landing/Landing';
import Post from '../widgets/blog/Post';
import compiler from '../scripts/compile-blog-index.block';

export default class Blog extends WidgetBase {
	protected render() {
		const paths: any = this.meta(Block).run(compiler)({ locale: i18n.locale });

		return <Landing>{paths && paths.map((path: string) => <Post path={path} excerpt />)}</Landing>;
	}
}
