export interface Version {
	name: string;
	shortName: string;
	current?: boolean;
	tag?: 'stable' | 'next';
}
