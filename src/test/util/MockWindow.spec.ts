import { mockWindow } from './MockWindow';

describe('MockWindow', () => {
	const saveLocation = window.location;

	afterAll(() => {
		delete window.location;
		window.location = saveLocation;
	});

	it('assigns the location when passed to mock directly', () => {
		const { assign } = mockWindow('http://foo.com').location;

		expect(window.location.href).toBe('http://foo.com/');

		assign.mockClear();
	});

	it('location.assign assigns a location', () => {
		const { assign } = mockWindow().location;
		assign('http://foo.com');

		expect(window.location.href).toBe('http://foo.com/');

		assign.mockClear();
	});

	it('location.replace replaces a location', () => {
		const { replace } = mockWindow().location;
		replace('http://bar.com');

		expect(window.location.href).toBe('http://bar.com/');

		replace.mockClear();
	});

	it('location.reload is a spy', () => {
		const { reload } = mockWindow().location;
		reload();

		expect(window.location.reload).toHaveBeenCalledTimes(1);

		reload.mockClear();
	});
});
