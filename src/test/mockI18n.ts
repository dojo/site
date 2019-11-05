import { create } from '@dojo/framework/core/vdom';
import { DefaultMiddlewareResult } from '@dojo/framework/core/interfaces';
import { Bundle, Messages } from '@dojo/framework/i18n/i18n';

const factory = create();

export function createI18nMock(locale: string) {
	const mockI18nMiddleware = factory(() => {
		return {
			get() {
				return {
					locale
				};
			},
			localize<T extends Messages>(bundle: Bundle<T>, useDefaults?: boolean) {
				return bundle;
			}
		};
	});

	function mockI18n(): DefaultMiddlewareResult {
		return mockI18nMiddleware();
	}
	return mockI18n;
}

export default createI18nMock;
