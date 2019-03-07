import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';
import i18n from '@dojo/framework/i18n/i18n';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { isVNode } from '@dojo/framework/widget-core/d';
import Block from '@dojo/framework/widget-core/meta/Block';

import compiler, { CompileRemoteBlockOptions } from '../scripts/compile-remote.block';
import Grid from '../widgets/grid/Grid';
import Landing from '../widgets/landing/Landing';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import LandingLink from '../widgets/landing/LandingLink';

import bundle from './ReferenceGuidesLanding.nls';

export default class ReferenceGuidesLanding extends I18nMixin(WidgetBase) {
	private _findFirstPage(list?: DNode | DNode[]): string | undefined {
		if (!list) {
			return;
		}

		if (!Array.isArray(list)) {
			list = [list];
		}

		for (let node of list) {
			if (!node) {
				continue;
			}

			if (isVNode(node)) {
				if (node.tag === 'a') {
					const match = /\.\/([\s\S]+)$/g.exec(node.properties.href);
					if (match && match.length > 1) {
						return match[1];
					}
				}
				if (node.children && node.children.length > 0) {
					const match = this._findFirstPage(node.children);
					if (match) {
						return match;
					}
				}
			}
		}
	}

	private _getFirstPage(options: CompileRemoteBlockOptions) {
		const content = this.meta(Block).run(compiler)({
			...options,
			locale: i18n.locale
		}) as any;

		return this._findFirstPage(content) || '';
	}

	protected render() {
		const { messages } = this.localizeBundle(bundle);

		return (
			<Landing key="tutorials-landing">
				<LandingSubsection>
					<Grid>
						<LandingLink
							title={messages.i18n}
							icon="globe"
							to="reference-guide-i18n"
							params={{
								page: this._getFirstPage({
									repo: 'dojo/framework',
									path: 'docs/:locale:/i18n/index.md'
								})
							}}
						>
							{messages.i18nDescription}
						</LandingLink>
					</Grid>
				</LandingSubsection>
			</Landing>
		);
	}
}
