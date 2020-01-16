import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import block from '@dojo/framework/core/middleware/block';

import createBlockMock from '../../test/mockBlock';

import getSections from '../sections.block';
import * as css from '../Learn.m.css';
import LearnSectionMenu from '../LearnSectionMenu';

describe('LearnSectionMenu', () => {
	const baseAssertion = assertionTemplate(() => [
		<li classes={css.columnMenuItem}>
			<Link
				classes={css.columnMenuLink}
				key="param1"
				to="learn"
				params={{ page: 'param1' }}
				activeClasses={[css.columnMenuLinkSelected]}
			>
				Title 1
			</Link>
		</li>,
		<li classes={css.columnMenuItem}>
			<Link
				classes={css.columnMenuLink}
				key="param2"
				to="learn"
				params={{ page: 'param2' }}
				activeClasses={[css.columnMenuLinkSelected]}
			>
				Title 2
			</Link>
		</li>
	]);

	const mockGetSections = jest.fn();
	mockGetSections.mockReturnValue([
		{
			title: 'Title 1',
			param: 'param1'
		},
		{
			title: 'Title 2',
			param: 'param2'
		}
	]);
	const mockBlock = createBlockMock([[getSections, mockGetSections]]);

	it('renders', () => {
		const h = harness(
			() => (
				<LearnSectionMenu
					key="menu"
					repo="dojo/framework"
					path="docs/:locale:/outline"
					branch="master"
					language="en"
					locale="en"
				/>
			),
			{ middleware: [[block, mockBlock]] }
		);

		h.expect(baseAssertion);

		expect(mockGetSections).toHaveBeenCalledWith({
			branch: 'master',
			path: 'docs/:locale:/outline',
			page: 'supplemental',
			repo: 'dojo/framework',
			language: 'en',
			locale: 'en'
		});
	});

	it('renders in another language', () => {
		const h = harness(
			() => (
				<LearnSectionMenu
					key="menu"
					repo="dojo/framework"
					path="docs/:locale:/outline"
					branch="master"
					language="zh"
					locale="zh-CN"
				/>
			),
			{ middleware: [[block, mockBlock]] }
		);

		h.expect(baseAssertion);

		expect(mockGetSections).toHaveBeenCalledWith({
			branch: 'master',
			path: 'docs/:locale:/outline',
			page: 'supplemental',
			repo: 'dojo/framework',
			language: 'zh',
			locale: 'zh-CN'
		});
	});

	it('renders when block returns undefined', () => {
		mockGetSections.mockReturnValue(undefined);
		const h = harness(
			() => (
				<LearnSectionMenu
					key="menu"
					repo="dojo/framework"
					path="docs/:locale:/outline"
					branch="master"
					language="en"
					locale="en"
				/>
			),
			{ middleware: [[block, mockBlock]] }
		);

		h.expect(() => []);
	});
});
