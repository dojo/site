import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import { GUIDES } from '../../constants';

import bundle from '../Footer.nls';
import * as css from '../Footer.m.css';
import Footer from '../Footer';

const openjsfLogo = require('../../assets/openjsf-color.svg');
const externalLink = require('../../assets/external-link.svg');

const { messages } = bundle;

describe('Footer', () => {
	const baseAssertion = assertionTemplate(() => (
		<footer classes={css.root}>
			<div classes={css.wrapper}>
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
									{GUIDES.map(({ name: guide }) => (
										<Link
											to="learn"
											classes={css.link}
											params={{
												guide: guide.toLowerCase().replace(' ', '-'),
												page: 'introduction'
											}}
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
										rel="noopener noreferrer"
										href="https://github.com/dojo/framework/blob/master/CODE_OF_CONDUCT.md"
										classes={css.link}
									>
										{messages.codeOfConduct}
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/framework"
										classes={css.link}
									>
										GitHub
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://discord.gg/M7yRngE"
										classes={css.link}
									>
										Discord
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://twitter.com/DojoFramework"
										classes={css.link}
									>
										Twitter
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://discourse.dojo.io/"
										classes={css.link}
									>
										Discourse
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<Link to="examples" classes={css.link}>
										{messages.examples}
									</Link>
								</div>
								<div classes={css.links}>
									<div classes={css.title}>{messages.repositories}</div>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/framework"
										classes={css.link}
									>
										framework
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/widgets"
										classes={css.link}
									>
										widgets
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/themes"
										classes={css.link}
									>
										themes
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/interop"
										classes={css.link}
									>
										interop
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli"
										classes={css.link}
									>
										cli
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli-create-app"
										classes={css.link}
									>
										cli-create-app
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli-build-app"
										classes={css.link}
									>
										cli-build-app
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli-build-widget"
										classes={css.link}
									>
										cli-build-widget
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli-create-theme"
										classes={css.link}
									>
										cli-create-theme
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli-build-theme"
										classes={css.link}
									>
										cli-build-theme
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli-upgrade-app"
										classes={css.link}
									>
										cli-upgrade-app
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/cli-test-intern"
										classes={css.link}
									>
										cli-test-intern
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/webpack-contrib"
										classes={css.link}
									>
										webpack-contrib
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://github.com/dojo/site"
										classes={css.link}
									>
										site
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
								</div>
								<div classes={css.links}>
									<div assertion-key="versions-title" classes={css.title}>
										{messages.versions}
									</div>
									<a
										assertion-key="v7-link"
										target="_blank"
										rel="noopener noreferrer"
										href="https://v7.dojo.io"
										classes={css.link}
									>
										v7.0
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://v6.dojo.io"
										classes={css.link}
									>
										v6.0
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href="https://v5.dojo.io"
										classes={css.link}
									>
										v5.0
										<img classes={css.externalLink} alt="externalLink" src={externalLink} />
									</a>
									<div classes={css.title}>{messages.languages}</div>
									<a assertion-key="english-link" href="https://dojo.io" classes={css.link}>
										{messages.english}
									</a>
									<a
										assertion-key="simplifiedChinese-link"
										href="https://zh-CN.dojo.io"
										classes={css.link}
									>
										{messages.simplifiedChinese}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	));

	it('renders', () => {
		const h = harness(() => <Footer branch="v8" isLatest={true} otherVersions={['v7', 'v6', 'v5']} />);
		h.expect(baseAssertion);
	});

	it('renders not latest', () => {
		const h = harness(() => <Footer branch="v7" isLatest={false} otherVersions={['v6', 'v5']} />);
		h.expect(
			baseAssertion
				.insertAfter('~versions-title', () => [
					<a target="_blank" rel="noopener noreferrer" href="https://dojo.io" classes={css.link}>
						Latest
						<img classes={css.externalLink} alt="externalLink" src={externalLink} />
					</a>
				])
				.remove('~v7-link')
				.setProperty('~english-link', 'href', 'https://v7.dojo.io')
				.setProperty('~simplifiedChinese-link', 'href', 'https://zh-CN.v7.dojo.io')
		);
	});

	it('renders master (next)', () => {
		const h = harness(() => <Footer branch="master" isLatest={true} otherVersions={['v7', 'v6', 'v5']} />);
		h.expect(
			baseAssertion
				.setProperty('~english-link', 'href', 'https://next.dojo.io')
				.setProperty('~simplifiedChinese-link', 'href', 'https://zh-CN.next.dojo.io')
		);
	});
});
