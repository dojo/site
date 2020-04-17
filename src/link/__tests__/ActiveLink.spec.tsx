import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx, w } from '@dojo/framework/core/vdom';
import injector from '@dojo/framework/core/middleware/injector';
import Link from '@dojo/framework/routing/Link';
import { RouteContext } from '@dojo/framework/routing/interfaces';

import createInjectorMock from '../../test/mockInjector';

import ActiveLink from '../ActiveLink';

describe('ActiveLink', () => {
	const router = {
		on: jest.fn(),
		getRoute: jest.fn()
	};
	const routerDestory = jest.fn();
	const mockInjector = createInjectorMock([['router', router]]);

	const matchContent: RouteContext = {
		id: 'outlet',
		outlet: 'outlet',
		type: 'index',
		params: {},
		queryParams: {},
		isError: () => false,
		isExact: () => true
	};

	const baseAssertionNoRouter = assertionTemplate(() =>
		w(
			Link,
			{
				to: 'outlet'
			},
			['Text']
		)
	);
	const baseAssertion = assertionTemplate(() =>
		w(
			Link,
			{
				to: 'outlet',
				classes: []
			},
			['Text']
		)
	);

	beforeEach(() => {
		jest.resetAllMocks();

		router.on.mockReturnValue({
			destroy: routerDestory
		});
	});

	it('renders', () => {
		const h = harness(() => (
			<ActiveLink to="outlet" activeClasses={['activeClass']}>
				Text
			</ActiveLink>
		));

		h.expect(baseAssertionNoRouter);
	});

	it('renders with router', () => {
		const h = harness(
			() => (
				<ActiveLink to="outlet" activeClasses={['activeClass']}>
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertion);

		expect(router.on).toHaveBeenCalledWith('outlet', expect.any(Function));
		expect(router.getRoute).toHaveBeenCalledWith('outlet');
	});

	it('renders active', () => {
		router.getRoute.mockReturnValueOnce(undefined).mockReturnValueOnce(matchContent);

		const h = harness(
			() => (
				<ActiveLink to="outlet" activeClasses={['activeClass']}>
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertion);
		expect(router.getRoute).toHaveBeenNthCalledWith(1, 'outlet');

		expect(router.on).toHaveBeenCalledWith('outlet', expect.any(Function));
		router.on.mock.calls[0][1]({ outlet: { id: 'outlet' } });

		h.expect(baseAssertion.setProperty(':root', 'classes', ['activeClass']));
		expect(router.getRoute).toHaveBeenNthCalledWith(2, 'outlet');

		router.on.mock.calls[0][1]({ outlet: { id: 'outlet2' } });
		h.expect(baseAssertion);
		expect(router.getRoute).toHaveBeenNthCalledWith(3, 'outlet');
	});

	it('handles changes to to param with no router', () => {
		let to = 'outlet';

		const h = harness(() => (
			<ActiveLink to={to} activeClasses={['activeClass']}>
				Text
			</ActiveLink>
		));

		h.expect(baseAssertionNoRouter);

		to = 'outlet2';

		h.expect(baseAssertionNoRouter.setProperty(':root', 'to', 'outlet2'));
	});

	it('handles changes to to param with router', () => {
		router.getRoute
			.mockReturnValueOnce(matchContent)
			.mockReturnValueOnce(undefined)
			.mockReturnValueOnce({ ...matchContent, id: 'outlet2' })
			.mockReturnValueOnce(undefined)
			.mockReturnValueOnce(matchContent);

		let to = 'outlet';

		const h = harness(
			() => (
				<ActiveLink to={to} activeClasses={['activeClass']}>
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertion.setProperty(':root', 'classes', ['activeClass']));
		expect(router.on).toHaveBeenCalledTimes(1);
		expect(router.getRoute).toHaveBeenNthCalledWith(1, 'outlet');
		expect(router.getRoute).toHaveBeenCalledTimes(1);

		to = 'outlet2';

		h.expect(baseAssertion.setProperty(':root', 'to', 'outlet2'));
		expect(router.on).toHaveBeenCalledTimes(2);
		expect(router.getRoute).toHaveBeenNthCalledWith(2, 'outlet2');
		expect(router.getRoute).toHaveBeenCalledTimes(2);
		router.on.mock.calls[1][1]({ outlet: { id: 'outlet2' } });
		h.expect(baseAssertion.setProperty(':root', 'to', 'outlet2').setProperty(':root', 'classes', ['activeClass']));
		expect(router.getRoute).toHaveBeenNthCalledWith(3, 'outlet2');
		expect(router.getRoute).toHaveBeenCalledTimes(3);

		to = 'outlet';

		h.expect(baseAssertion);
		expect(routerDestory).toHaveBeenCalled();
		expect(router.getRoute).toHaveBeenNthCalledWith(4, 'outlet');
		expect(router.getRoute).toHaveBeenCalledTimes(4);
		router.on.mock.calls[1][1]({ outlet: { id: 'outlet' } });
		h.expect(baseAssertion.setProperty(':root', 'classes', ['activeClass']));

		router.on.mock.calls[1][1]({ outlet: { id: 'outlet2' } });
		h.expect(baseAssertion);
	});

	it('mixs in single class', () => {
		router.getRoute.mockReturnValueOnce(undefined).mockReturnValueOnce(matchContent);

		const h = harness(
			() => (
				<ActiveLink to="outlet" activeClasses={['activeClass']} classes="aClass">
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertion.setProperty(':root', 'classes', ['aClass']));
		expect(router.getRoute).toHaveBeenNthCalledWith(1, 'outlet');

		expect(router.on).toHaveBeenCalledWith('outlet', expect.any(Function));
		router.on.mock.calls[0][1]({ outlet: { id: 'outlet' } });

		h.expect(baseAssertion.setProperty(':root', 'classes', ['aClass', 'activeClass']));
		expect(router.getRoute).toHaveBeenNthCalledWith(2, 'outlet');
	});

	it('mixs in an array of classes', () => {
		router.getRoute.mockReturnValueOnce(undefined).mockReturnValueOnce(matchContent);

		const h = harness(
			() => (
				<ActiveLink to="outlet" activeClasses={['activeClass']} classes={['class1', 'class2']}>
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertion.setProperty(':root', 'classes', ['class1', 'class2']));
		expect(router.getRoute).toHaveBeenNthCalledWith(1, 'outlet');

		expect(router.on).toHaveBeenCalledWith('outlet', expect.any(Function));
		router.on.mock.calls[0][1]({ outlet: { id: 'outlet' } });

		h.expect(baseAssertion.setProperty(':root', 'classes', ['class1', 'class2', 'activeClass']));
		expect(router.getRoute).toHaveBeenNthCalledWith(2, 'outlet');
	});

	it('allows different router key to be passed in', () => {
		router.getRoute.mockReturnValue(undefined);

		const h = harness(
			() => (
				<ActiveLink to="outlet" activeClasses={['activeClass']} routerKey="routerKey">
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertionNoRouter.setProperty(':root', 'routerKey', 'routerKey'));
	});

	it('allows different match params to be passed in', () => {
		router.getRoute.mockReturnValue(matchContent);

		const h = harness(
			() => (
				<ActiveLink to="outlet" activeClasses={['activeClass']} matchParams={{ param: 'match' }}>
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertion.setProperty(':root', 'matchParams', { param: 'match' }));
	});

	it('allows different params to be passed in', () => {
		router.getRoute.mockReturnValue(matchContent);

		const h = harness(
			() => (
				<ActiveLink to="outlet" activeClasses={['activeClass']} params={{ param: 'match' }}>
					Text
				</ActiveLink>
			),
			{
				middleware: [[injector, mockInjector]]
			}
		);

		h.expect(baseAssertion.setProperty(':root', 'params', { param: 'match' }));
	});
});
