const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

import { REGION_GROUP_MATCHER } from '../../../../../scripts/regions/parser';
import { BLOCK_C_MATCHER } from '../../../../../scripts/regions/region-matchers/block-c';

const regionName = 'RegionName';
const regionName2 = 'RegionName2';

const regionContents = `	protected render() {
		return (<div></div>);
	}`;

const region = `	/* @start-region RegionName */
${regionContents}
	/* @end-region RegionName */`;

describe('block-c region-matcher', () => {
  it('should match start annotations', () => {
		let matches: RegExpExecArray | null;
		
		const regionMatcher = BLOCK_C_MATCHER(regionName);
		const startMatcher = new RegExp(regionMatcher.regionStartMatcher);

		matches = startMatcher.exec(`/* @start-region ${regionName} */`);
		assert.isNotNull(matches);

    matches = startMatcher.exec(`/*@start-region ${regionName}*/`);
		assert.isNotNull(matches);

    matches = startMatcher.exec(`/* @start-region ${regionName2} */`);
		assert.isNull(matches);
  });

  it('should match end annotations', () => {
		let matches: RegExpExecArray | null;
		
		const regionMatcher = BLOCK_C_MATCHER(regionName);
		const endMatcher = new RegExp(regionMatcher.regionEndMatcher);

		matches = endMatcher.exec(`/* @end-region ${regionName} */`);
		assert.isNotNull(matches);

    matches = endMatcher.exec(`/*@end-region ${regionName}*/`);
		assert.isNotNull(matches);

    matches = endMatcher.exec(`/* @end-region ${regionName2} */`);
		assert.isNull(matches);
	});
	
  it('should match full region and retreive contents', () => {
		let matches: RegExpExecArray | null;
		
		const regionMatcher = BLOCK_C_MATCHER(regionName);
		const regionRegExp = new RegExp(`${regionMatcher.regionStartMatcher}${REGION_GROUP_MATCHER}${regionMatcher.regionEndMatcher}`, 'gm');

		matches = regionRegExp.exec(region);
		assert.isNotNull(matches);
		
		if (matches) {
			assert.lengthOf(matches, 2);
			assert.equal(matches[1], regionContents);
		}
  });
});