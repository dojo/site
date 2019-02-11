import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';

import Grid from '../widgets/grid/Grid';
import LinkedCard, { LinkedCardProperties } from '../widgets/card/LinkedCard';

import * as css from './Community.m.css';
import CardHeader, { CardHeaderProperties } from '../widgets/card/CardHeader';

const conduct = require('../assets/icon-conduct.svg');
const github = require('../assets/logo-github.svg');
const discord = require('../assets/logo-discord.svg');
const twitter = require('../assets/logo-twitter.svg');
const discourse = require('../assets/logo-discourse.svg');
const dojo = require('../assets/dojo-logo-black.svg');

export interface SimpleLinkedCardProperties extends CardHeaderProperties, LinkedCardProperties {
	description: string;
}

export const links: SimpleLinkedCardProperties[] = [
	{
		title: 'Code of Conduct',
		url: 'https://github.com/dojo/framework/blob/master/CODE_OF_CONDUCT.md',
		image: {
			src: conduct,
			alt: 'Code of Conduct'
		},
		description: 'Read and understand our full Code of Conduct.'
	},
	{
		title: 'GitHub',
		url: 'https://github.com/dojo/framework',
		image: {
			src: github,
			alt: 'GitHub'
		},
		description: 'Pull requests always welcomed!'
	},
	{
		title: 'Discord',
		url: 'https://discord.gg/M7yRngE',
		image: {
			src: discord,
			alt: 'Discord'
		},
		description: 'Chat with us on Discord!'
	},
	{
		title: 'Twitter',
		url: 'https://twitter.com/dojo',
		image: {
			src: twitter,
			alt: 'Twitter'
		},
		description: 'Tweets about Dojo announcements, events, talks, and more!'
	},
	{
		title: 'Discourse',
		url: 'https://discourse.dojo.io/',
		image: {
			src: discourse,
			alt: 'Discourse'
		},
		description: 'Questions asked and answered.'
	},
	{
		title: 'Examples',
		url: 'https://dojo.github.io/examples/',
		image: {
			src: dojo,
			alt: 'Dojo Examples'
		},
		description: 'Dojo projects and more.'
	}
];

export const projects: SimpleLinkedCardProperties[] = [
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
		description: 'Provides bindings and interoperability between Dojo and other libraries'
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

interface CommunityProperties {
	links: SimpleLinkedCardProperties[];
	projects: SimpleLinkedCardProperties[];
}

@theme(css)
export default class Community extends ThemedMixin(WidgetBase)<CommunityProperties> {
	private _renderCard(params: SimpleLinkedCardProperties) {
		const { description, title, url, image } = params;

		return (
			<LinkedCard header={<CardHeader title={title} image={image} />} url={url}>
				{description}
			</LinkedCard>
		);
	}

	protected render() {
		const { links, projects } = this.properties;

		return (
			<div classes={[css.root]}>
				<h2>Community Links</h2>

				<Grid>{links.map((link) => this._renderCard(link))}</Grid>

				<h2>Projects</h2>

				<p>Dojo is a project consisting of several projects! We are always looking for new contributors.</p>

				<Grid>{projects.map((project) => this._renderCard(project))}</Grid>
			</div>
		);
	}
}
