import { RegionMatcherFactory } from '../parser';

// These kind of comments are used in HTML
export const HTML_MATCHER: RegionMatcherFactory = {
	factory: (region) => {
		return {
			regionStartMatcher: `^\\s*<!-- *@start-region ${region}\\s*-->\\s*$`,
			regionEndMatcher: `\\s*<!-- *@end-region ${region}\\s*-->\\s*$`
		};
	},
	regionCommentMatcher: /^\s*<!-- *@(start|end)-region \S*\s*-->\s*/gm
};
