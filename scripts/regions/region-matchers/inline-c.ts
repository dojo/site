import { RegionMatcherFactory } from '../parser';

// This comment type is used in C like languages such as JS, TS, Dart, etc
export const INLINE_C_MATCHER: RegionMatcherFactory = (region) => {
	return {
		regionStartMatcher: `^\\s*\\/\\/ *@start-region ${region}\\s*$`,
		regionEndMatcher: `\\s*\\/\\/ *@end-region ${region}\\s*$`,
		regionCommentMatcher: /^\s*\/\/ *@(start|end)-region \S*\s*/gm
	};
};
