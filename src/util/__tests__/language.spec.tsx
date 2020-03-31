import { getLanguageFromLocale } from '../language';

describe('content compiler', () => {
	it('parses language string from locale', () => {
		expect(getLanguageFromLocale('en')).toBe('en');
		expect(getLanguageFromLocale('zh')).toBe('zh');
		expect(getLanguageFromLocale('es-SV')).toBe('es');
	});

	it('returns input if not in format [a-z]-[A-Z]', () => {
		expect(getLanguageFromLocale('en')).toBe('en');
		expect(getLanguageFromLocale('zh')).toBe('zh');
		expect(getLanguageFromLocale('es')).toBe('es');
	});
});
