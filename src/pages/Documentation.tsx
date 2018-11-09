import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';
import Link from '@dojo/framework/routing/ActiveLink';
import * as css from './Documentation.m.css';

import list from '../generated/list';

export default class Documentation extends WidgetBase {
	private _cache: any = {};
	private _getTutorial(path: string) {
		if (this._cache[path]) {
			console.log(this._cache[path]);
			return this._cache[path];
		}
		import(`./../generated/tutorials/${path}`).then((module) => {
			this._cache[path] = module.default();
			this.invalidate();
		});
		return null;
	}
	protected render() {
		return (
			<div classes={[css.root]}>
				{list.map(({ name, path }) => (
					<div key="name">
						<Link key={name} to="tutorial" params={{ tutorial: path }} activeClasses={['active']}>
							{name}
						</Link>
					</div>
				))}
				<Outlet id="tutorial" renderer={({ params }) => this._getTutorial(params.tutorial)} />
			</div>
		);
	}
}
