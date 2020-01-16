import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import i18n from '@dojo/framework/core/middleware/i18n';

import createI18nMock from '../../test/mockI18n';

import LearnContent from '../LearnContent';
import LearnSectionMenu from '../LearnSectionMenu';
import * as css from '../Learn.m.css';
import Learn, { guides } from '../Learn';

describe('Learn', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={css.root}>
			<nav classes={css.nav}>
				<ul classes={css.menuList}>
					{guides.map((guide) => {
						return (
							<li classes={css.menuItem}>
								<Link
									to="learn"
									classes={css.menuLink}
									params={{ guide: guide.toLowerCase().replace(' ', '-'), page: 'introduction' }}
									matchParams={{ guide: guide.toLowerCase().replace(' ', '-') }}
									activeClasses={[css.selected]}
								>
									{guide}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<main classes={css.main}>
				<div classes={css.menu}>
					<ul classes={css.columnMenuList}>
						<li classes={css.columnMenuItem}>
							<Link
								key="intro"
								classes={css.columnMenuLink}
								to="learn"
								params={{ page: 'introduction' }}
								activeClasses={[css.columnMenuLinkSelected]}
							>
								Introduction
							</Link>
						</li>
						<LearnSectionMenu
							key="menu"
							repo="dojo/framework"
							path="docs/:locale:/outline"
							branch="v6"
							language="en"
							locale="en"
						/>
					</ul>
				</div>
				<LearnContent
					key="content"
					url="url/to/page"
					repo="dojo/framework"
					page="introduction"
					path="docs/:locale:/outline"
					branch="v6"
					language="en"
					locale="en"
				/>
			</main>
		</div>
	));

	it('renders overview', () => {
		const h = harness(() => <Learn guideName="overview" pageName="introduction" url="url/to/page" />);

		h.expect(baseAssertion);
	});

	it('renders non-overview guide', () => {
		const h = harness(() => <Learn guideName="middleware" pageName="introduction" url="url/to/page" />);

		h.expect(
			baseAssertion
				.setProperty('@menu', 'path', 'docs/:locale:/middleware')
				.setProperty('@content', 'path', 'docs/:locale:/middleware')
		);
	});

	it('renders in another language', () => {
		const mockI18n = createI18nMock('zh-cn');

		const h = harness(() => <Learn guideName="outline" pageName="introduction" url="url/to/page" />, {
			middleware: [[i18n, mockI18n]]
		});

		h.expect(
			baseAssertion
				.setProperty('@menu', 'language', 'zh')
				.setProperty('@menu', 'locale', 'zh-cn')
				.setProperty('@content', 'language', 'zh')
				.setProperty('@content', 'locale', 'zh-cn')
		);
	});
});
