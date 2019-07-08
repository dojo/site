import { IconName, IconLookup, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { IconHeaderBackgroundColor } from './widgets/card/CardIconHeader';

import bundle from './pages/reference-guides/ReferenceGuides.nls';

export interface ReferenceGuide {
	name: keyof typeof bundle.messages;
	description: keyof typeof bundle.messages;
	icon: IconName | IconLookup | [IconPrefix, IconName];
	color?: IconHeaderBackgroundColor;
	to: string;
	repository: Repository;
	path: string;
}

export interface Content {
	referenceGuides: ReferenceGuide[];
}

export interface Repository {
	name: string;
	branch?: string;
}
