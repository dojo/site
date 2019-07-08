interface MockedLocation extends Location {
	assign: jest.Mock<void, [string]>;
	reload: jest.Mock;
	replace: jest.Mock<void, [string]>;
}

interface MockedWindow extends Window {
	location: MockedLocation;
}

export function mockWindow(href = window.location.href) {
	const win: Window = window;
	const locationMocks: Partial<MockedLocation> = {
		assign: jest.fn().mockImplementation(replaceLocation),
		reload: jest.fn(),
		replace: jest.fn().mockImplementation(replaceLocation)
	};

	return replaceLocation(href);

	function replaceLocation(url: string) {
		delete win.location;
		win.location = Object.assign(new URL(url), locationMocks) as any;
		return win as MockedWindow;
	}
}
