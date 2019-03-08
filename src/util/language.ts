export function getLanguageFromLocale(locale: string) {
	const localeMatch = /([a-z]+)-\S+/g.exec(locale);
	if (localeMatch && localeMatch.length === 2) {
		locale = localeMatch[1];
	}
	return locale;
}
