import { WNode } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import { resolve } from 'path';
import { readFileSync } from 'fs-extra';

import { WidgetBuilder, fromMarkdown } from '../compile';

import { BLOCK_C_MATCHER } from './region-matchers/block-c';
import { INLINE_C_MATCHER } from './region-matchers/inline-c';
import { HTML_MATCHER } from './region-matchers/html';

const refractor = require('refractor');
refractor.register(require(`refractor/lang/tsx.js`));

export type RegionMatcherFactory = (region: string) => RegionMatcher;

export interface RegionMatcher {
	regionStartMatcher: string;
	regionEndMatcher: string;
	regionCommentMatcher: RegExp;
}

const regionMatchers: { [key: string]: RegionMatcherFactory } = {
	ts: INLINE_C_MATCHER,
	tsx: INLINE_C_MATCHER,
	html: HTML_MATCHER,
	css: BLOCK_C_MATCHER,
	json: INLINE_C_MATCHER
};

export const REGION_GROUP_MATCHER = '\\s*^(.[\\s\\S]*)$';

export const regionBuilder: WidgetBuilder = (type: string, props: any): WNode => {
	let { path, region, language = 'ts' } = props;
	path = resolve(__dirname, '../../', 'content/examples', path);

	const regionMatcher = regionMatchers[language](region);

	let code = readFileSync(path, 'utf-8');
	if (region) {
		const regionRegExp = new RegExp(
			`${regionMatcher.regionStartMatcher}${REGION_GROUP_MATCHER}${regionMatcher.regionEndMatcher}`,
			'gm'
		);
		const regionMatches = regionRegExp.exec(code);
		if (regionMatches && regionMatches.length) {
			code = regionMatches[1];
		}
	}

	code = leftAlign(stripRegionComments(code.split('\n'), regionMatcher)).join('\n');

	return w(type, props, [fromMarkdown('```' + `${language}\n${code}\n` + '```', {})]);
};

export const stripRegionComments = (lines: string[], regionMatcher: RegionMatcher): string[] => {
	return lines.filter((line) => !line.match(regionMatcher.regionCommentMatcher));
};

export const leftAlign = (lines: string[]): string[] => {
	let indent = Number.MAX_VALUE;
	lines.forEach((line) => {
		const lineIndent = line.search(/\S/);
		if (lineIndent !== -1) {
			indent = Math.min(lineIndent, indent);
		}
	});
	return lines.map((line) => line.substr(indent));
};
