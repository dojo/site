import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import createBlockMock from '../../test/mockBlock';

import getContent from '../content.block';
import * as css from '../Learn.m.css';
import LearnContent from '../LearnContent';

jest.unmock('@dojo/framework/core/util');

describe('LearnContent', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={css.content}>
			<div>
				<a href="url/to/page#test">Test</a>
				<a href="http://test.com">Test</a>
			</div>
		</div>
	));

	it('renders', () => {
		const mockBlock = createBlockMock([
			[
				getContent,
				() => (
					<div>
						<a href="#test">Test</a>
						<a href="http://test.com">Test</a>
					</div>
				)
			]
		]);

		const h = harness(
			() => (
				<LearnContent
					key="content"
					url="url/to/page"
					repo="dojo/framework"
					page="introduction"
					path="docs/:locale:/outline"
					branch="master"
					language="en"
					locale="en"
				/>
			),
			{
				middleware: [[block, mockBlock]]
			}
		);

		h.expect(baseAssertion);
	});
});
