import renderer from '@dojo/framework/widget-core/vdom';
import Registry from '@dojo/framework/widget-core/Registry';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { StateHistory } from '@dojo/framework/routing/history/StateHistory';

import Aside from './widgets/content/Aside';
import CodeBlock from './widgets/code/CodeBlock';
import CodeSandbox from './widgets/code/CodeSandbox';
import Instruction from './widgets/content/Instruction';
import Metadata from './widgets/content/Metadata';
import Task from './widgets/content/Task';

import routes from './routes';
import App from './App';

const registry = new Registry();

registerRouterInjector(routes, registry, { HistoryManager: StateHistory });

registry.define('docs-aside', Aside);
registry.define('docs-codeblock', CodeBlock);
registry.define('docs-codesandbox', CodeSandbox);
registry.define('docs-instruction', Instruction);
registry.define('docs-metadata', Metadata);
registry.define('docs-task', Task);

const r = renderer(() => <App />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });
