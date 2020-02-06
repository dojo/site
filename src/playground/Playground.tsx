import { tsx, create } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import block from '@dojo/framework/core/middleware/block';
import theme from '@dojo/framework/core/middleware/theme';
import { RenderResult } from '@dojo/framework/core/interfaces';

import Menu from '../menu/Menu';

import listBlock from './list.block';
import * as css from './Playground.m.css';
import bundle from './Playground.nls';
interface PlaygroundProperties {
	branch: string;
	example: string;
}

const factory = create({ theme, block, i18n }).properties<PlaygroundProperties>();

const SANDBOX_URL =
	'https://codesandbox.io/embed/github/dojo/dojo-codesandbox-template/tree/master/?autoresize=1&hidenavigation=1';

export default factory(function Playground({ middleware: { theme, block, i18n }, properties }) {
	const { messages } = i18n.localize(bundle);
	const { branch, example: exampleName } = properties();
	const examples = block(listBlock)({ branch }) || [];
	const themedCss = theme.classes(css);

	let url = SANDBOX_URL;
	let githubUrl;
	let name: RenderResult = messages.sandbox;
	if (exampleName !== 'sandbox') {
		const example = examples.find((example) => example.exampleName === exampleName);
		if (example) {
			if (example.sandbox) {
				url = `https://codesandbox.io/s/github/dojo/examples/tree/${branch}/${example.exampleName}`;
			} else {
				url = example.demo;
			}
			name = example.example.children;
			githubUrl = `https://github.com/dojo/examples/tree/${branch}/${example.exampleName}`;
		}
	}

	return (
		<div classes={themedCss.root}>
			<Menu
				desktopStyle="dropdown"
				activeName={name}
				links={[
					{
						label: messages.sandbox,
						to: 'playground',
						params: { example: 'sandbox' }
					},
					...examples.map((example) => ({
						label: example.example.children,
						to: 'playground',
						params: { example: example.exampleName }
					}))
				]}
			>
				{githubUrl && (
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${name} Github`}
						classes={themedCss.iconLink}
					>
						<svg
							style="fill: white;"
							height="28px"
							viewBox="0 0 16 16"
							version="1.1"
							width="28"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
							></path>
						</svg>
					</a>
				)}
			</Menu>
			<iframe classes={themedCss.iframe} src={url} />
		</div>
	);
});
