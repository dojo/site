import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, WNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Card.m.css';

const recongizedChildWidgets: { [key: string]: string } = {
	CardHeader: 'header',
	CardIconHeader: 'header',
	CardFooter: 'footer'
};

@theme(css)
export default class Card extends ThemedMixin(WidgetBase) {
	private _isRegonizedChild(child: DNode): string | undefined {
		if (!child || typeof child === 'string') {
			return undefined;
		}

		if (child.type === '__WNODE_TYPE') {
			const name = (child as any).widgetConstructor.name;
			return recongizedChildWidgets[name] ? recongizedChildWidgets[name] : undefined;
		}

		return undefined;
	}

	protected render(): DNode {
		const knownChildren: { [key: string]: WNode } = {};
		const unknownChildren: DNode[] = [];
		this.children.map((child) => {
			const recognizedName = this._isRegonizedChild(child);
			if (recognizedName) {
				knownChildren[recognizedName] = child as WNode;
			} else {
				unknownChildren.push(child);
			}
		});

		return (
			<div key="card" data-test="card" classes={this.theme(css.root)}>
				{knownChildren.header}
				<div key="content" data-test="content" classes={this.theme(css.content)}>
					{unknownChildren}
				</div>
				{knownChildren.footer}
			</div>
		);
	}
}
