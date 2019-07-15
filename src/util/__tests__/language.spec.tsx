import { getLanguageFromLocale } from '../language';

describe('content compiler', () => {
	it('parses language string from locale', () => {
		expect(getLanguageFromLocale('en-US')).toBe('en');
		expect(getLanguageFromLocale('zh-cn')).toBe('zh');
		expect(getLanguageFromLocale('fr-fr')).toBe('fr');
	});

	it('returns input if not in format [a-z]-[A-Z]', () => {
		expect(getLanguageFromLocale('en')).toBe('en');
		expect(getLanguageFromLocale('zh')).toBe('zh');
		expect(getLanguageFromLocale('fr')).toBe('fr');
	});
});
