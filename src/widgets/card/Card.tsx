import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, WNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import * as css from './Card.m.css';
import { tsx } from '@dojo/framework/widget-core/tsx';
import CardHeader from './CardHeader';

export interface CardProperties {
	title?: string;
	image?:
		| {
				src: string;
				alt?: string;
		  }
		| string;
}

const recongizedChildWidgets: { [key: string]: string } = {
	'CardHeader': 'header',
	'CardIconHeader': 'header',
	'CardFooter': 'footer'
};

@theme(css)
export default class Card extends ThemedMixin(WidgetBase)<CardProperties> {
	private _isRegonizedChild(child: DNode): string | undefined {
		if (!child || typeof child === 'string') {
			return undefined;
		}

		if (child.type === '__WNODE_TYPE') {
			child = child as WNode;
			const name = child && child.widgetConstructor ? (child.widgetConstructor as any).name : undefined;
			if (name) {
				return recongizedChildWidgets[name] ? recongizedChildWidgets[name] : undefined;
			}
		}

		return undefined;
	}

	protected render(): DNode {
		const { title, image } = this.properties;
		const knownChildren: { [key: string]: WNode } = {};
		const unknownChildren: DNode[] = [];
		this.children.map((child) => {
			const recognizedName = this._isRegonizedChild(child);
			if (recognizedName) {
				knownChildren[recognizedName] = (child as WNode)
			} else {
				unknownChildren.push(child);
			}
		});

		console.log(knownChildren);
		console.log(unknownChildren);

		return (
			<div data-test="card" classes={this.theme(css.root)}>
				{title || knownChildren.header ? (
					knownChildren.header
						? knownChildren.header
						: <CardHeader image={image} title={title} />
				) : null}
				<div classes={this.theme(css.content)}>{unknownChildren}</div>
				{knownChildren.footer}
			</div>
		);
	}
}
