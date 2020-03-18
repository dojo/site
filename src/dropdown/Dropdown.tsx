import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import { RenderResult } from '@dojo/framework/core/interfaces';
import Link from '@dojo/framework/routing/Link';

import { MenuLinkProperties } from '../menu/Menu';

import * as css from './Dropdown.m.css';

export interface DropdownProperties {
	items: MenuLinkProperties[];
	activeName: RenderResult;
}

const factory = create({ theme }).properties<DropdownProperties>();

export default factory(function Dropdown({ middleware: { theme }, properties }) {
	const { items, activeName } = properties();

	const themedCss = theme.classes(css);

	const showDropdown = items.length > 1;

	return (
		<div classes={themedCss.root}>
			{showDropdown && (
				<div classes={themedCss.content}>
					<ul classes={themedCss.list}>
						{items.map((item) => {
							const { label, ...props } = item;
							return (
								<li classes={themedCss.listItem}>
									<Link classes={themedCss.link} {...props}>
										{label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			)}
			<div classes={[themedCss.parent, !showDropdown && themedCss.noDropdown]}>
				{activeName}
				{showDropdown && <span classes={themedCss.chevron}></span>}
			</div>
		</div>
	);
});
