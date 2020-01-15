import { tsx, create } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@dojo/framework/core/middleware/theme';
import Link from '@dojo/framework/routing/Link';

import { guides } from '../learn/Learn';

import bundle from './Footer.nls';
import * as css from './Footer.m.css';

const openjsfLogo = require('../assets/openjsf-color.svg');
const externalLink = require('../assets/external-link.svg');

const factory = create({ theme, i18n });

export default factory(function Footer({ middleware: { theme, i18n } }) {
	const { messages } = i18n.localize(bundle);
	const themedCss = theme.classes(css);

	return (
		<footer classes={themedCss.root}>
			<div classes={themedCss.content}>
				<div classes={themedCss.contentRow}>
					<div classes={themedCss.copyright}>
						<img classes={[themedCss.logo]} alt="logo" src={openjsfLogo} />
						{`© ${new Date().getFullYear()} Open JS Foundation`}
					</div>
					<div classes={themedCss.linksWrapper}>
						<div classes={themedCss.linksRow}>
							<div classes={themedCss.links}>
								<div classes={themedCss.title}>{messages.docs}</div>
								{guides.map(({ name: guide }) => (
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
							<div classes={themedCss.links}>
								<div classes={themedCss.title}>{messages.community}</div>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/framework/blob/master/CODE_OF_CONDUCT.md"
									classes={css.link}
								>
									{messages.codeOfConduct}
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/framework"
									classes={css.link}
								>
									GitHub
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://discord.gg/M7yRngE"
									classes={css.link}
								>
									Discord
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://twitter.com/dojo"
									classes={css.link}
								>
									Twitter
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://discourse.dojo.io/"
									classes={css.link}
								>
									Discourse
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<Link to="examples" classes={css.link}>
									{messages.examples}
								</Link>
								<Link to="dojoswag" class={css.link}>
									{messages.dojoSwag}
								</Link>
							</div>
							<div classes={themedCss.links}>
								<div classes={themedCss.title}>{messages.repositories}</div>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/framework"
									classes={css.link}
								>
									framework
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/widgets"
									classes={css.link}
								>
									widgets
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/themes"
									classes={css.link}
								>
									themes
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/interop"
									classes={css.link}
								>
									interop
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli"
									classes={css.link}
								>
									cli
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli-create-app"
									classes={css.link}
								>
									cli-create-app
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli-build-app"
									classes={css.link}
								>
									cli-build-app
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli-build-widget"
									classes={css.link}
								>
									cli-build-widget
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli-create-theme"
									classes={css.link}
								>
									cli-create-theme
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli-build-theme"
									classes={css.link}
								>
									cli-build-theme
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli-upgrade-app"
									classes={css.link}
								>
									cli-upgrade-app
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/cli-test-intern"
									classes={css.link}
								>
									cli-test-intern
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/webpack-contrib"
									classes={css.link}
								>
									webpack-contrib
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://github.com/dojo/site"
									classes={css.link}
								>
									site
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
							</div>
							<div classes={themedCss.links}>
								<div classes={themedCss.title}>{messages.versions}</div>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://v5.dojo.io"
									classes={css.link}
								>
									v5.0
									<img classes={themedCss.externalLink} alt="externalLink" src={externalLink} />
								</a>
								<div classes={themedCss.title}>{messages.languages}</div>
								<a href="https://dojo.io" classes={css.link}>
									{messages.english}
								</a>
								<a href="https://zh-CN.dojo.io" classes={css.link}>
									{messages.simplifiedChinese}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
});
