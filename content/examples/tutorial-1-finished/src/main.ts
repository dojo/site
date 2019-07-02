import renderer from '@dojo/framework/core/vdom';
import { w } from '@dojo/framework/core/vdom';
import App from './widgets/App';

const r = renderer(() => w(App, {}));
r.mount({ domNode: document.querySelector('dojo-io') as HTMLElement });
