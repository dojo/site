import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Community.m.css';

const conduct = require('../assets/icon-conduct.svg');
const github = require('../assets/logo-github.svg');
const discord = require('../assets/logo-discord.svg');
const twitter = require('../assets/logo-twitter.svg');
const discourse = require('../assets/logo-discourse.svg');
const dojo = require('../assets/dojo-logo-black.svg');

interface CardProperties {
	title: string;
	url: string;
	image?: string;
	imageAlt?: string;
	description: string;
}

const links: CardProperties[] = [
	{
		title: 'Code of Conduct',
		url: 'https://github.com/dojo/framework/blob/master/CODE_OF_CONDUCT.md',
		image: conduct,
		imageAlt: 'Code of Conduct',
		description: 'Read and understand our full Code of Conduct.'
	},
	{
		title: 'GitHub',
		url: 'https://github.com/dojo/framework',
		image: github,
		imageAlt: 'GitHub',
		description: 'Pull requests always welcomed!'
	},
	{
		title: 'Discord',
		url: 'https://discord.gg/M7yRngE',
		image: discord,
		imageAlt: 'Discord',
		description: 'Chat with us on Discord!'
	},
	{
		title: 'Twitter',
		url: 'https://twitter.com/dojo',
		image: twitter,
		imageAlt: 'Twitter',
		description: 'Tweets about Dojo announcements, events, talks, and more!'
	},
	{
		title: 'Discourse',
		url: 'https://discourse.dojo.io/',
		image: discourse,
		imageAlt: 'Discourse',
		description: 'Questions asked and answered.'
	},
	{
		title: 'Examples',
		url: 'https://dojo.github.io/examples/',
		image: dojo,
		imageAlt: 'Dojo Examples',
		description: 'Dojo projects and more.'
	}
];

const projects: CardProperties[] = [
	{
		title: '@dojo/framework',
		url: 'https://github.com/dojo/framework',
		description: 'Dojo Framework. A Progressive Framework for Modern Web Apps'
	},
	{
		title: '@dojo/widgets',
		url: 'https://github.com/dojo/widgets',
		description: 'Dojo UI Widgets'
	},
	{
		title: '@dojo/themes',
		url: 'https://github.com/dojo/themes',
		description: 'Dojo framework themes'
	},
	{
		title: '@dojo/interop',
		url: 'https://github.com/dojo/interop',
		description: 'Provides bindings and interoperability between Dojo packages and other libraries'
	},
	{
		title: '@dojo/cli',
		url: 'https://github.com/dojo/cli',
		description: 'Dojo command-line tooling'
	},
	{
		title: '@dojo/cli-create-app',
		url: 'https://github.com/dojo/cli-create-app',
		description: 'CLI command for creating app boilerplates'
	},
	{
		title: '@dojo/cli-build-app',
		url: 'https://github.com/dojo/cli-build-app',
		description: 'CLI command for building dojo applications'
	},
	{
		title: '@dojo/cli-create-widget',
		url: 'https://github.com/dojo/cli-build-widget',
		description: 'CLI command for creating widgets boilerplate'
	},
	{
		title: '@dojo/cli-build-widget',
		url: 'https://github.com/dojo/cli-build-widget',
		description: 'CLI command for building dojo widgets'
	},
	{
		title: '@dojo/cli-create-theme',
		url: 'https://github.com/dojo/cli-create-theme',
		description: 'CLI tooling support for theme generation in Dojo'
	},
	{
		title: '@dojo/cli-build-theme',
		url: 'https://github.com/dojo/cli-build-theme',
		description: 'Command for building Dojo themes'
	},
	{
		title: '@dojo/cli-upgrade-app',
		url: 'https://github.com/dojo/cli-upgrade-app',
		description: 'Migration tool to assist users in upgrading between versions of Dojo'
	},
	{
		title: '@dojo/cli-test-intern',
		url: 'https://github.com/dojo/cli-test-intern',
		description: 'CLI command for testing applications'
	},
	{
		title: '@dojo/webpack-contrib',
		url: 'https://github.com/dojo/webpack-contrib',
		description: 'Plugins and loaders for webpack used with Dojo'
	},
	{
		title: '@dojo/site',
		url: 'https://github.com/dojo/site',
		description: 'The source for this site'
	}
];

class Card extends WidgetBase<CardProperties> {
	protected renderHeader() {
		const { title, url, image, imageAlt = '' } = this.properties;
		const titleTag = <h3>{title}</h3>;
		const imgTag = image && <img src={image} alt={imageAlt}/>;
		return (
			<div classes={[css.header]}>
				{
					url
					? <a href={url}>{imgTag}{titleTag}</a>
					: <span>{imgTag}{titleTag}</span>
				}
			</div>
		);
	}

	protected render() {
		const { description } = this.properties;
		return (
			<div classes={[css.card]}>
				{this.renderHeader()}
				<p>{description}</p>
			</div>
		);
	}
}

export default class Community extends WidgetBase {
	protected render() {
		return (
			<div classes={[css.root]}>
				<h2>Community Links</h2>

				<div classes={[css.cards]}>
					{links.map(({ title, url, image, imageAlt, description }) => (
					<Card title={title} url={url} image={image} imageAlt={imageAlt} description={description}/>
					))}
				</div>

				<h2>Projects</h2>

				<div classes={[css.cards]}>
					{projects.map(({ title, url, image, imageAlt, description }) => (
					<Card title={title} url={url} image={image} imageAlt={imageAlt} description={description}/>
					))}
				</div>
			</div>
		);
	}
}
