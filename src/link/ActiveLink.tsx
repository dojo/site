import { create, diffProperty, invalidator, w } from '@dojo/framework/core/vdom';
import { Handle } from '@dojo/framework/core/Destroyable';
import injector from '@dojo/framework/core/middleware/injector';
import icache from '@dojo/framework/core/middleware/icache';
import { SupportedClassName } from '@dojo/framework/core/interfaces';
import Link, { LinkProperties } from '@dojo/framework/routing/Link';
import Router from '@dojo/framework/routing/Router';
import { Params } from '@dojo/framework/routing/interfaces';

export interface ActiveLinkProperties extends LinkProperties {
	activeClasses: SupportedClassName[];
	matchParams?: Params;
}

function paramsEqual(linkParams: Params = {}, contextParams: Params) {
	return Object.keys(linkParams).every((key) => linkParams[key] === contextParams[key]);
}

const factory = create({ injector, diffProperty, icache, invalidator }).properties<ActiveLinkProperties>();

export const ActiveLink = factory(function ActiveLink({
	middleware: { diffProperty, injector, icache, invalidator },
	properties,
	children
}) {
	const { to, routerKey = 'router', params, matchParams = params } = properties();
	let { activeClasses, classes = [], ...props } = properties();

	diffProperty('to', (current: ActiveLinkProperties, next: ActiveLinkProperties) => {
		if (current.to !== next.to) {
			const router = injector.get<Router>(routerKey);
			const currentHandle = icache.get<Handle>('handle');
			if (currentHandle) {
				currentHandle.destroy();
			}
			if (router) {
				const handle = router.on('outlet', ({ outlet }) => {
					if (outlet.id === to) {
						invalidator();
					}
				});
				icache.set('handle', handle);
			}
			invalidator();
		}
	});

	const router = injector.get<Router>(routerKey);
	if (router) {
		if (!icache.get('handle')) {
			const handle = router.on('outlet', ({ outlet }) => {
				if (outlet.id === to) {
					invalidator();
				}
			});
			icache.set('handle', handle);
		}
		const context = router.getRoute(to);
		const isActive = context && paramsEqual(matchParams, context.params);

		classes = Array.isArray(classes) ? classes : [classes];
		if (isActive) {
			classes = [...classes, ...activeClasses];
		}
		props = { ...props, classes };
	}
	return w(Link, props, children());
});

export default ActiveLink;
