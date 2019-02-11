import renderer from '@dojo/framework/widget-core/vdom';
import Registry from '@dojo/framework/widget-core/Registry';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { StateHistory } from '@dojo/framework/routing/history/StateHistory';

import Alert from './widgets/content/Alert';
import Aside from './widgets/content/Aside';
import Card from './widgets/card/Card';
import CardHeader from './widgets/card/CardHeader';
import CardIconHeader from './widgets/card/CardIconHeader';
import CardFooter from './widgets/card/CardFooter';
import CodeBlock from './widgets/code/CodeBlock';
import CodeSandbox from './widgets/code/CodeSandbox';
import Grid from './widgets/grid/Grid';
import LinkedCard from './widgets/card/LinkedCard';

import routes from './routes';
import App from './App';

const registry = new Registry();

registerRouterInjector(routes, registry, { HistoryManager: StateHistory });

registry.define('docs-alert', Alert);
registry.define('docs-aside', Aside);
registry.define('docs-card', Card);
registry.define('docs-cardheader', CardHeader);
registry.define('docs-cardiconheader', CardIconHeader);
registry.define('docs-cardfooter', CardFooter);
registry.define('docs-codeblock', CodeBlock);
registry.define('docs-codesandbox', CodeSandbox);
registry.define('docs-grid', Grid);
registry.define('docs-linkedcard', LinkedCard);

const r = renderer(() => <App />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });
