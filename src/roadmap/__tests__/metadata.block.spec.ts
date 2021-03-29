import * as path from 'canonical-path';
import * as fs from 'fs-extra';

import metadataBlock, { RoadmapMetaData } from '../metadata.block';

describe('roadmap metadata block', () => {
	const files: { file: string; content: string }[] = [
		{
			file: 'content/roadmap/en/one.md',
			content: `
---
title: Dojo 6
date: Q2 2019
released: false
---

File one content
			`
		},
		{
			file: 'content/roadmap/en/two.md',
			content: `
---
title: Dojo 5
date: February 2019
released: true
---

File two content
			`
		},
		{
			file: 'content/roadmap/en/three.md',
			content: `
---
title: Dojo 20
---

File three content
			`
		},
		{
			file: 'content/roadmap/en/four.md',
			content: `
---
title: Dojo 7
date: October 2019
released: false
---

File four content
			`
		},
		{
			file: 'content/roadmap/en/five.md',
			content: `
---
date: June 2020
released: false
---

File five content
			`
		},
		{
			file: 'content/roadmap/en/six.md',
			content: `
---
title: Entry with bad date
date: Bad Date
released: false
---

File size content
			`
		},
		{
			file: 'content/roadmap/en/seven.md',
			content: `
A random file with no meta data
			`
		}
	];

	const expectedOutput: RoadmapMetaData[] = [
		{
			file: 'roadmap/en/three.md',
			title: 'Dojo 20',
			date: 'Future',
			sortDate: 'Future',
			released: false
		},
		{
			file: 'roadmap/en/six.md',
			title: 'Entry with bad date',
			date: 'Bad Date',
			sortDate: 'Bad Date',
			released: false
		},
		{
			file: 'roadmap/en/seven.md',
			title: 'Upcoming Feature',
			date: 'Future',
			sortDate: 'Future',
			released: false
		},
		{
			file: 'roadmap/en/five.md',
			title: 'Upcoming Feature',
			date: 'June 2020',
			sortDate: new Date('2020-06-30T23:59:00.000Z'),
			released: false
		},
		{
			file: 'roadmap/en/four.md',
			title: 'Dojo 7',
			date: 'October 2019',
			sortDate: new Date('2019-10-31T23:59:00.000Z'),
			released: false
		},
		{
			file: 'roadmap/en/one.md',
			title: 'Dojo 6',
			date: 'Q2 2019',
			sortDate: new Date('2019-06-30T23:59:00.000Z'),
			released: false
		},
		{
			file: 'roadmap/en/two.md',
			title: 'Dojo 5',
			date: 'February 2019',
			sortDate: new Date('2019-02-28T23:59:00.000Z'),
			released: true
		}
	];

	const mockReadFile: jest.SpyInstance<Promise<string>> = jest.spyOn(fs, 'readFile') as any;
	const mockJoin = jest.spyOn(path, 'join');
	const mockReaddir = jest.spyOn(fs, 'readdir') as unknown as jest.SpyInstance<Promise<string[]>>;

	beforeEach(() => {
		jest.resetAllMocks();

		mockJoin.mockReturnValueOnce('path/to/roadmaps');

		files.map((file) => {
			mockReadFile.mockResolvedValueOnce(file.content);
			mockJoin.mockReturnValueOnce(file.file);
		});

		mockReaddir.mockReturnValue(Promise.resolve(files.map((file) => file.file)));
	});

	it('gets meta data from files', async () => {
		const result = await metadataBlock({ locale: 'en' });

		expect(result).toEqual(expectedOutput);
	});

	it('defaults to english if no locale provided', async () => {
		const result = await metadataBlock({});

		expect(result).toEqual(expectedOutput);
	});

	it('handles none english locales', async () => {
		const result = await metadataBlock({ locale: 'fr' });

		expect(result).toEqual(
			expectedOutput.map((file) => ({
				...file,
				file: file.file.replace('en', 'fr')
			}))
		);
	});

	it('returns an emptry array if no files found', async () => {
		mockReaddir.mockReturnValue(Promise.resolve([]));

		const result = await metadataBlock({ locale: 'en' });

		expect(result).toEqual([]);
	});
});
