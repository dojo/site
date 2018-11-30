import { DNode } from '@dojo/framework/widget-core/interfaces';
import { w, v } from '@dojo/framework/widget-core/d';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs-extra';

import { WidgetBuilder, getHyperscript } from '../compile';

import { BLOCK_C_MATCHER } from './region-matchers/block-c';
import { INLINE_C_MATCHER } from './region-matchers/inline-c';
import { HTML_MATCHER } from './region-matchers/html';

const refractor = require('refractor');
refractor.register(require(`refractor/lang/tsx.js`));

export type RegionMatcherFactory = {
	factory: (region: string) => RegionMatcher;
	regionCommentMatcher: RegExp;
};

export interface RegionMatcher {
	regionStartMatcher: string;
	regionEndMatcher: string;
}

// TODO: Move this into the code block widget
export interface RegionCodeBlockProps {
	path?: string;
	region?: string;
	language: string;
}

const regionMatchers: { [key: string]: RegionMatcherFactory } = {
	ts: INLINE_C_MATCHER,
	tsx: INLINE_C_MATCHER,
	html: HTML_MATCHER,
	css: BLOCK_C_MATCHER,
	json: INLINE_C_MATCHER
};

export const REGION_GROUP_MATCHER = '\\s*^(.[\\s\\S]*)$';

export const regionBuilder: WidgetBuilder = (type: string, props: RegionCodeBlockProps): DNode => {
	let { path, region, language = 'ts' } = props;
	if (path === undefined) {
		return v('p', ['Invalid file path']);
	}

	const resolvedPath = resolve(__dirname, '../../', 'content/examples', path);

	let code: string | undefined;
	if (!existsSync(resolvedPath)) {
		return v('p', ['Could not load file']);
	}

	if (regionMatchers[language] === undefined) {
		return v('p', ['Could not recognize language']);
	}

	const regionMatcherFactory = regionMatchers[language];

	let fileInput = readFileSync(resolvedPath, 'utf-8');
	if (region !== undefined) {
		const regionMatcher = regionMatcherFactory.factory(region);
		const regionRegExp = new RegExp(
			`${regionMatcher.regionStartMatcher}${REGION_GROUP_MATCHER}${regionMatcher.regionEndMatcher}`,
			'gm'
		);
		const regionMatches = regionRegExp.exec(fileInput);
		if (regionMatches && regionMatches.length) {
			code = regionMatches[1];
		}
	} else {
		code = fileInput;
	}

	if (code !== undefined) {
		code = leftAlign(stripRegionComments(code.split('\n'), regionMatcherFactory.regionCommentMatcher)).join('\n');
		const wProps: any = { path, region, language };
		return w(type, wProps, [getHyperscript('```' + `${language}\n${code}\n` + '```', {})]);
	} else {
		return v('p', ['Could not load region']);
	}
};

export const stripRegionComments = (lines: string[], regionCommentMatcher: RegExp): string[] => {
	return lines.filter((line) => !line.match(regionCommentMatcher));
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
