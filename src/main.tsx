import renderer from '@dojo/framework/widget-core/vdom';
import Registry from '@dojo/framework/widget-core/Registry';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import routes from './routes';
import App from './App';

const registry = new Registry();

registerRouterInjector(routes, registry);

const r = renderer(() => <App />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });
