import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import LinkedCard from '../widgets/card/LinkedCard';
import Community from './Community';
import CardHeader from '../widgets/card/CardHeader';

describe('Community Page', () => {
	describe('Community', () => {
		it('renders', () => {
			const h = harness(() => <Community />);
			h.expectPartial('@links > *', () => (
				<LinkedCard
					header={
						<CardHeader
							title="Code of Conduct"
							image={{
								src: 'test-file-stub',
								alt: 'Code of Conduct'
							}}
						/>
					}
					url="https://github.com/dojo/framework/blob/master/CODE_OF_CONDUCT.md"
				>
					Read and understand our full Code of Conduct.
				</LinkedCard>
			));
			h.expectPartial('@projects > *', () => (
				<LinkedCard header={<CardHeader title="@dojo/framework" />} url="https://github.com/dojo/framework">
					Dojo Framework. A Progressive Framework for Modern Web Apps
				</LinkedCard>
			));
		});
	});
});
