import { create } from '@dojo/framework/core/vdom';
import { DefaultMiddlewareResult } from '@dojo/framework/core/interfaces';

const factory = create();

export function createInjectorMock(injectors: [string, any][] = []) {
	const injectorsMockMap = new Map(injectors);
	const mockInjectorMiddleware = factory(() => {
		return {
			get(injector: any) {
				const mock = injectorsMockMap.get(injector);
				if (mock) {
					return mock;
				}
				return null;
			}
		};
	});

	function mockInjector(): DefaultMiddlewareResult {
		return mockInjectorMiddleware();
	}
	return mockInjector;
}

export default createInjectorMock;
