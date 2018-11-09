import { RegionMatcherFactory } from '../../interface';

// These type of comments are used in hash comment based languages such as bash and Yaml
export const INLINE_HASH_MATCHER: RegionMatcherFactory = (region) => {
	return {
		regionStartMatcher: `^\\s*# *@start-region ${region}\\s*$`,
		regionEndMatcher: `\\s*# *@end-region ${region}\\s*$`,
		regionCommentMatcher: /^\s*# *@(start|end)-region \S*\s*/gm
	};
};
