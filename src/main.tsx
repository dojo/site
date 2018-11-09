import renderer from '@dojo/framework/widget-core/vdom';
import Registry from '@dojo/framework/widget-core/Registry';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import Aside from './widgets/Aside';
import CodeSandbox from './widgets/CodeSandbox';
import CodeBlock from './widgets/CodeBlock';
import Instruction from './widgets/Instruction';
import Metadata from './widgets/Metadata';
import Task from './widgets/Task';

import routes from './routes';
import App from './App';

const registry = new Registry();

registerRouterInjector(routes, registry);

registry.define('docs-aside', Aside);
registry.define('docs-codeblock', CodeBlock);
registry.define('docs-codesandbox', CodeSandbox);
registry.define('docs-instruction', Instruction);
registry.define('docs-metadata', Metadata);
registry.define('docs-task', Task);

const r = renderer(() => <App />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });
