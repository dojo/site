import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import CardIconHeader, { colorClasses, IconHeaderBackgroundColor } from '../CardIconHeader';
import * as css from '../CardIconHeader.m.css';
import FontAwesomeIcon from '../../icon/FontAwesomeIcon';

describe('CardIconHeader', () => {
	const baseAssertion = assertionTemplate(() => (
		<header key="card-icon-header" data-test="card-icon-header" classes={[css.root, css.backgroundBlue]}>
			<FontAwesomeIcon icon="coffee" size="4x" />
		</header>
	));

	it('default renders', () => {
		const h = harness(() => <CardIconHeader icon="coffee" />);
		h.expect(baseAssertion);
	});

	it('renders background colors', () => {
		for (let key in Object.keys(colorClasses)) {
			let colorKey: IconHeaderBackgroundColor = key as IconHeaderBackgroundColor;
			const h = harness(() => <CardIconHeader icon="coffee" background={colorKey} />);

			const assertion = baseAssertion.setProperty('@card-icon-header', 'classes', [
				css.root,
				colorClasses[colorKey]
			]);
			h.expect(assertion);
		}
	});
});
