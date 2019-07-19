import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './LandingSubsection.m.css';

interface LandingSubsectionProperties {
	title?: string;
}

const factory = create({ theme }).properties<LandingSubsectionProperties>();

export default factory(function LandingSubsection({ middleware: { theme }, children, properties }) {
	const { title } = properties();
	const themedCss = theme.classes(css);

	return (
		<div key="landingSubsection" classes={themedCss.root}>
			{title && <h2>{title}</h2>}
			{children()}
		</div>
	);
});
