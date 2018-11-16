const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

import { REGION_GROUP_MATCHER } from '../../../regions/parser';
import { INLINE_HASH_MATCHER } from '../../../regions/region-matchers/inline-hash';

const regionName = 'RegionName';
const regionName2 = 'RegionName2';

const regionContents = `	some:
		setting:
			# This is for setting a message
			property: 'Hey there!'
			otherProperty: true`;

const region = `	# @start-region RegionName
${regionContents}
	# @end-region RegionName`;

describe('inline-hash region-matcher', () => {
	it('should match start annotations', () => {
		let matches: RegExpExecArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.factory(regionName);
		const startMatcher = new RegExp(regionMatcher.regionStartMatcher);

		matches = startMatcher.exec(`# @start-region ${regionName}`);
		assert.isNotNull(matches);

		matches = startMatcher.exec(`#@start-region ${regionName}`);
		assert.isNotNull(matches);

		matches = startMatcher.exec(`# @start-region ${regionName2}`);
		assert.isNull(matches);
	});

	it('should match end annotations', () => {
		let matches: RegExpExecArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.factory(regionName);
		const endMatcher = new RegExp(regionMatcher.regionEndMatcher);

		matches = endMatcher.exec(`# @end-region ${regionName} `);
		assert.isNotNull(matches);

		matches = endMatcher.exec(`#@end-region ${regionName}`);
		assert.isNotNull(matches);

		matches = endMatcher.exec(`# @end-region ${regionName2}`);
		assert.isNull(matches);
	});

	it('should match all region comments', () => {
		let matches: RegExpMatchArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.regionCommentMatcher;

		matches = `# @end-region ${regionName} `.match(regionMatcher);
		assert.isNotNull(matches);

		matches = `#@end-region ${regionName2}`.match(regionMatcher);
		assert.isNotNull(matches);

		matches = `# @start-region ${regionName} `.match(regionMatcher);
		assert.isNotNull(matches);

		matches = `#@start-region ${regionName2}`.match(regionMatcher);
		assert.isNotNull(matches);

		matches = `# @middle-region ${regionName} `.match(regionMatcher);
		assert.isNull(matches);
	});

	it('should match full region and retreive contents', () => {
		let matches: RegExpExecArray | null;

		const regionMatcher = INLINE_HASH_MATCHER.factory(regionName);
		const regionRegExp = new RegExp(
			`${regionMatcher.regionStartMatcher}${REGION_GROUP_MATCHER}${regionMatcher.regionEndMatcher}`,
			'gm'
		);

		matches = regionRegExp.exec(region);
		assert.isNotNull(matches);

		if (matches) {
			assert.lengthOf(matches, 2);
			assert.equal(matches[1], regionContents);
		}
	});
});
