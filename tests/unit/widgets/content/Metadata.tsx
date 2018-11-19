const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Metadata, { MetadataProperties } from '../../../../src/widgets/content/Metadata';

describe('Metadata', () => {
	it('renders', () => {
		const noMetaData: MetadataProperties = {};
		const h = harness(() => <Metadata {...noMetaData}></Metadata>);
		h.expect(() => <table></table>);

		const someMetaData: MetadataProperties = {
			version: '1.0.0',
			name: 'Fish',
			author: 'Billy Bob'
		};
		const h2 = harness(() => <Metadata {...someMetaData}></Metadata>);
		h2.expect(() => <table>
			{Object.keys(someMetaData).map((key) => {
				return (
					<tr>
						<td>{key}</td>
						<td>{someMetaData[key]}</td>
					</tr>
				);
			})}
		</table>);
	});
});
