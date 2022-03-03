import harness from '@dojo/framework/testing/harness/harness';
import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import { tsx } from '@dojo/framework/core/vdom';
import { DefaultMiddlewareResult } from '@dojo/framework/core/interfaces';
import block from '@dojo/framework/core/middleware/block';

import Menu, { MenuLinkProperties } from '../../menu/Menu';
import createBlockMock from '../../test/mockBlock';

import listBlock from '../list.block';
import * as css from '../Playground.m.css';
import bundle from '../Playground.nls';
import Playground from '../Playground';

const { messages } = bundle;

describe('Playground', () => {
	const mockListBlock = jest.fn();
	let mockBlock: () => DefaultMiddlewareResult;

	const baseAssertion = assertionTemplate(() => (
		<div classes={css.root}>
			<Menu
				assertion-key="menu"
				desktopStyle="dropdown"
				activeName={messages.sandbox}
				links={[
					{
						key: 'sandbox',
						label: messages.sandbox,
						to: 'playground'
					},
					{
						key: 'name-demo',
						label: ['Example Name'],
						to: 'playground-example',
						params: { example: 'name', type: 'demo' },
						matchParams: { example: 'name' }
					},
					{
						key: 'name2-demo',
						label: ['Example Name 2'],
						to: 'playground-example',
						params: { example: 'name2', type: 'demo' },
						matchParams: { example: 'name2' }
					}
				]}
				subActiveName={messages.sandbox}
				subLinks={undefined}
			></Menu>
			<iframe
				classes={css.iframe}
				src="https://codesandbox.io/embed/github/dojo/dojo-codesandbox-template/tree/master/?autoresize=1&hidenavigation=1"
			/>
		</div>
	));

	const subLinks = (exampleName: string, showSandbox: boolean) => {
		const links: MenuLinkProperties[] = [
			{
				key: `${exampleName}-demo`,
				label: messages.demo,
				to: 'playground-example',
				params: { example: exampleName, type: 'demo' }
			}
		];

		if (showSandbox) {
			links.push({
				key: `${exampleName}-sandbox`,
				label: messages.sandbox,
				to: 'playground-example',
				params: { example: exampleName, type: 'sandbox' }
			});
		}

		return links;
	};

	const githubLink = (branch: string, name: string, displayName: string) => [
		<a
			href={`https://github.com/dojo/examples/tree/${branch}/packages/${name}`}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${displayName} Github`}
			classes={css.iconLink}
		>
			<svg classes={css.icon} height="28px" viewBox="0 0 16 16" version="1.1" width="28" aria-hidden="true">
				<path
					fill-rule="evenodd"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
				></path>
			</svg>
		</a>
	];

	beforeEach(() => {
		mockListBlock.mockReturnValue([
			{
				code: 'code',
				demo: 'demo/url',
				example: <div>Example Name</div>,
				exampleName: 'name',
				overview: 'overview',
				sandbox: true
			},
			{
				code: 'code',
				demo: 'demo2/url',
				example: <div>Example Name 2</div>,
				exampleName: 'name2',
				overview: 'overview',
				sandbox: false
			}
		]);
		mockBlock = createBlockMock([[listBlock, mockListBlock]]);
	});

	it('renders sandbox', () => {
		const h = harness(() => <Playground example="sandbox" type="sandbox" />, {
			middleware: [[block, mockBlock]]
		});

		h.expect(baseAssertion);
	});

	it('renders example with sandbox type', () => {
		const h = harness(() => <Playground example="name" type="sandbox" />, {
			middleware: [[block, mockBlock]]
		});

		h.expect(
			baseAssertion
				.setProperty('iframe', 'src', 'https://codesandbox.io/s/github/dojo/examples/tree/v8/packages/name')
				.setProperty('~menu', 'activeName', ['Example Name'])
				.setProperty('~menu', 'subActiveName', 'Sandbox')
				.setProperty('~menu', 'subLinks', subLinks('name', true))
				.setChildren('~menu', () => githubLink('v8', 'name', 'Example Name'))
		);
	});

	it('renders example with demo type', () => {
		const h = harness(() => <Playground example="name2" type="demo" />, {
			middleware: [[block, mockBlock]]
		});

		h.expect(
			baseAssertion
				.setProperty('iframe', 'src', 'demo2/url')
				.setProperty('~menu', 'activeName', ['Example Name 2'])
				.setProperty('~menu', 'subActiveName', 'Demo')
				.setProperty('~menu', 'subLinks', subLinks('name2', false))
				.setChildren('~menu', () => githubLink('v8', 'name2', 'Example Name 2'))
		);
	});

	it('renders sandbox if example not found', () => {
		const h = harness(() => <Playground example="badName" type="demo" />, {
			middleware: [[block, mockBlock]]
		});

		h.expect(
			baseAssertion
				.setProperty('~menu', 'subActiveName', 'Demo')
				.setProperty('~menu', 'subLinks', subLinks('badName', false))
		);
	});
});
