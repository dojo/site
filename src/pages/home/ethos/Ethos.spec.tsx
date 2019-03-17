import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import * as css from './Ethos.m.css';
import Ethos from './Ethos';
import Card from '../../../widgets/card/Card';
import FontAwesomeIcon from '../../../widgets/icon/FontAwesomeIcon';

describe('Ethos', () => {
	it('renders', () => {
		const h = harness(() => <Ethos />);
		h.expect(() => (
			<section classes={[css.root]}>
				<Card extraClasses={{ root: css.ethosPoint }}>
					<div classes={[css.ethosTitleContainer]}>
						<span classes={[css.productive]}>
							<FontAwesomeIcon icon="code-branch" />
						</span>
						<h3 classes={[css.ethosTitle]}>Productive</h3>
					</div>
					<div>
						Dojo enables teams to build web applications with a deliberate approach to productivity,
						sustainability and code management.
					</div>
				</Card>
				<Card extraClasses={{ root: css.ethosPoint }}>
					<div classes={[css.ethosTitleContainer]}>
						<span classes={[css.adaptable]}>
							<FontAwesomeIcon icon="plug" />
						</span>
						<h3 classes={[css.ethosTitle]}>Adaptable</h3>
					</div>
					<div>
						Intent on not reinventing the wheel, Dojo allows for easy integration with the most powerful
						solutions available today on the open web.
					</div>
				</Card>
				<Card extraClasses={{ root: css.ethosPoint }}>
					<div classes={[css.ethosTitleContainer]}>
						<span classes={[css.inclusive]}>
							<FontAwesomeIcon icon="users" />
						</span>
						<h3 classes={[css.ethosTitle]}>Inclusive</h3>
					</div>
					<div>
						Demand for accessibility and internationalization are required for enterprise web applications.
						Dojo supports inclusivity and provides both.
					</div>
				</Card>
			</section>
		));
	});
});
