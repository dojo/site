import { join, basename } from 'canonical-path';
import { readdir, readFile } from 'fs-extra';

import metadata from '../common/metadata';

const CONTENT_PATH = join(__dirname, '../../content/roadmap');

interface CompileRoadmapMetadataBlockOptions {
	locale?: string;
}

export interface RoadmapMetaData {
	file: string;
	title: string;
	date: string;
	sortDate: Date | string;
	released: boolean;
}

export default async function(options: CompileRoadmapMetadataBlockOptions) {
	const { locale = 'en' } = options;
	const folder = join(CONTENT_PATH, locale);

	const files = await readdir(folder);

	const filesMetaData: RoadmapMetaData[] = [];

	for (let file of files) {
		const content = await readFile(join(folder, file), 'utf-8');
		const fileMetaData = metadata(content);

		filesMetaData.push({
			file: `roadmap/${locale}/${basename(file)}`,
			title: typeof fileMetaData.title === 'string' ? fileMetaData.title : 'Upcoming Feature',
			date: typeof fileMetaData.date === 'string' ? fileMetaData.date : 'Future',
			sortDate: parseAbstractDate(typeof fileMetaData.date === 'string' ? fileMetaData.date : 'Future'),
			released: typeof fileMetaData.released === 'boolean' ? fileMetaData.released : false
		});
	}

	filesMetaData.sort((a, b) => {
		if (typeof b.sortDate === 'string' && typeof a.sortDate === 'string') {
			return 0;
		}

		if (typeof b.sortDate === 'string') {
			return 1;
		}

		if (typeof a.sortDate === 'string') {
			return -1;
		}

		return b.sortDate.getTime() - a.sortDate.getTime();
	});
	return filesMetaData;
}

export function parseAbstractDate(date: string): Date | string {
	// Match `Quarter Year` format
	const match = /Q([1-4]) ([2-9][0-9]{3})/g.exec(date);
	if (match && match.length === 3) {
		const endOfQuarter = new Date(Date.UTC(+match[2], +match[1] * 3)); // Months start at index 0, so 3 is actually month 4 (April)
		endOfQuarter.setMinutes(endOfQuarter.getMinutes() - 1); // Substract 1 minute so you end up with date like March 31, 2019 11:59pm
		return endOfQuarter;
	}

	// Match `Month Year` format
	const monthMatch = /(January|February|March|April|May|June|July|August|September|October|November|December) ([2-9][0-9]{3})/g.exec(
		date
	);
	if (monthMatch && monthMatch.length === 3) {
		const month = new Date(Date.parse(`${monthMatch[1]} 1, ${monthMatch[2]}`)).getMonth();
		const endOfMonth = new Date(Date.UTC(+monthMatch[2], month + 1));
		endOfMonth.setMinutes(endOfMonth.getMinutes() - 1); // Substract 1 minute so you end up with date like March 31, 2019 11:59pm
		return endOfMonth;
	}

	return date;
}
