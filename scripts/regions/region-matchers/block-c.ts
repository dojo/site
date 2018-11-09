import { RegionMatcherFactory } from '../../interface';

// These kind of comments are used CSS and other languages that do not support inline comments
export const BLOCK_C_MATCHER: RegionMatcherFactory = (region) => {
	return {
		regionStartMatcher: `^\\s*\\/\\* *@start-region ${region}\\s*\\*\\/\\s*$`,
		regionEndMatcher: `\\s*\\/\\* *@end-region ${region}\\s*\\*\\/\\s*$`,
		regionCommentMatcher: /^\s*\/\* *@(start|end)-region \S*\s*\*\/\s*/gm
	};
};
