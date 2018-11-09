import { WNode } from "@dojo/framework/widget-core/interfaces";

export interface Handler {
	type: string;
	inline?: boolean;
}

export type HandlerFunction = (h: Function, node: any) => any;

export interface WidgetBuilders {
	[type: string]: WidgetBuilder;
}

export type WidgetBuilder = (type: string, props: any, children: any[]) => WNode;

export type RegionMatcherFactory = (region: string) => RegionMatcher;

export interface RegionMatcher {
  regionStartMatcher: string;
	regionEndMatcher: string;
	regionCommentMatcher: RegExp;
}
