import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import { guides } from '../../learn/Learn';

import bundle from '../Footer.nls';
import * as css from '../Footer.m.css';
import Footer from '../Footer';

const openjsfLogo = require('../assets/openjsf-color.svg');

const { messages } = bundle;

describe('Footer', () => {
	const baseAssertion = assertionTemplate(() => (
		<footer classes={css.root}>
			<div classes={css.content}>
				<div classes={css.contentRow}>
					<div classes={css.copyright}>
						<img classes={[css.logo]} alt="logo" src={openjsfLogo} />
						{`© ${new Date().getFullYear()} Open JS Foundation`}
					</div>
					<div classes={css.linksWrapper}>
						<div classes={css.linksRow}>
							<div classes={css.links}>
								<div classes={css.title}>{messages.docs}</div>
								{guides.map((guide) => (
									<Link
										to="learn"
										classes={css.link}
										params={{ guide: guide.toLowerCase().replace(' ', '-'), page: 'introduction' }}
										matchParams={{ guide: guide.toLowerCase().replace(' ', '-') }}
									>
										{guide}
									</Link>
								))}
							</div>
							<div classes={css.links}>
								<div classes={css.title}>{messages.community}</div>
								<a
									target="_blank"
									href="https://github.com/dojo/framework/blob/master/CODE_OF_CONDUCT.md"
									classes={css.link}
								>
									{messages.codeOfConduct}
								</a>
								<a target="_blank" href="https://github.com/dojo/framework" classes={css.link}>
									GitHub
								</a>
								<a target="_blank" href="https://discord.gg/M7yRngE" classes={css.link}>
									Discord
								</a>
								<a target="_blank" href="https://twitter.com/dojo" classes={css.link}>
									Twitter
								</a>
								<a target="_blank" href="https://discourse.dojo.io/" classes={css.link}>
									Discourse
								</a>
								<Link to="examples" classes={css.link}>
									{messages.examples}
								</Link>
							</div>
							<div classes={css.links}>
								<div classes={css.title}>{messages.repositories}</div>
								<a target="_blank" href="https://github.com/dojo/framework" classes={css.link}>
									framework
								</a>
								<a target="_blank" href="https://github.com/dojo/widgets" classes={css.link}>
									widgets
								</a>
								<a target="_blank" href="https://github.com/dojo/themes" classes={css.link}>
									themes
								</a>
								<a target="_blank" href="https://github.com/dojo/interop" classes={css.link}>
									interop
								</a>
								<a target="_blank" href="https://github.com/dojo/cli" classes={css.link}>
									cli
								</a>
								<a target="_blank" href="https://github.com/dojo/cli-create-app" classes={css.link}>
									cli-create-app
								</a>
								<a target="_blank" href="https://github.com/dojo/cli-build-app" classes={css.link}>
									cli-build-app
								</a>
								<a target="_blank" href="https://github.com/dojo/cli-build-widget" classes={css.link}>
									cli-build-widget
								</a>
								<a target="_blank" href="https://github.com/dojo/cli-create-theme" classes={css.link}>
									cli-create-theme
								</a>
								<a target="_blank" href="https://github.com/dojo/cli-build-theme" classes={css.link}>
									cli-build-theme
								</a>
								<a target="_blank" href="https://github.com/dojo/cli-upgrade-app" classes={css.link}>
									cli-upgrade-app
								</a>
								<a target="_blank" href="https://github.com/dojo/cli-test-intern" classes={css.link}>
									cli-test-intern
								</a>
								<a target="_blank" href="https://github.com/dojo/webpack-contrib" classes={css.link}>
									webpack-contrib
								</a>
								<a target="_blank" href="https://github.com/dojo/site" classes={css.link}>
									site
								</a>
							</div>
							<div classes={css.links}>
								<div classes={css.title}>{messages.versions}</div>
								<a target="_blank" href="https://dojo.github.io/dojo.io" classes={css.link}>
									v5.0
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	));

	it('renders', () => {
		const h = harness(() => <Footer />);
		h.expect(baseAssertion);
	});
});
