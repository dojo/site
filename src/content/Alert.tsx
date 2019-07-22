import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Alert.m.css';

export interface AlertProperties {
	type?: 'success' | 'info' | 'danger' | 'warning';
}

const factory = create({ theme }).properties<AlertProperties>();

export default factory(function Alert({ middleware: { theme }, children, properties }) {
	const { type = 'info' } = properties();
	const themedCss = theme.classes(css);

	return <div classes={[themedCss.root, themedCss[type]]}>{children()}</div>;
});
