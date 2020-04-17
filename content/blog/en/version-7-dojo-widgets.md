---
title: Announcing Dojo 7 Widgets
date: 2020-04-20T08:00:00.000Z
author: Eric Osmundson
---

Since the last release, we have been working to expand the Dojo Widgets library, while also improving the developer experience. With new advances in Dojo features, functionality, and recommended best practices, Dojo 7 was the perfect time to overhaul the Dojo Widgets library. This release makes it easier for developers to build efficient and modern web applications.

For Dojo 7, we focused on improvements in several key areas:

- Expanding the widget library, focusing on widgets that provide the most value to end users.
- Refactoring all widgets as function-based and in TSX.
- Adopt the latest recommended Dojo widget authoring patterns.
- Improve out of the box usability of each widget.
- Standardize widget property patterns across the library.
- Improve the theming experience for end users.
- Expand documentation and widget examples.

## Expanded Widget Library

Providing maximum value to Dojo users means focusing on providing users a strong suite of widgets out of the box. Version 7 of Dojo Widgets includes over two dozen new widgets that developers can use to build feature-rich applications even faster. Included are specialized widget variants, data-aware widgets, and widgets for building column layouts.

#### New Widgets

The new Card widget provides a simple and consistently styled container for content and actions. It uses the new child renderer pattern, accepting content for different sections and rendering them in the appropriate location with appropriate styling.

> src/MyCard.tsx
```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import Card from '@dojo/widgets/card';
import Button from '@dojo/widgets/button';
import Icon from '@dojo/widgets/icon';
const mediaSrc = require('./img/card-photo.jpg');

const factory = create();

export default factory(function CardWithMediaContent() {
	return (
		<div styles={{ width: '400px' }}>
			<Card
				onAction={() => {}}
				mediaSrc={mediaSrc}
				title="Hello, World"
				subtitle="A pretty picture"
			>
				{{
					header: <div>Header Content</div>,
					content: <span>Travel the world today.</span>,
					actionButtons: (
						<virtual>
							<Button>Read</Button>
							<Button>Bookmark</Button>
						</virtual>
					),
					actionIcons: (
						<virtual>
							<Icon type="secureIcon" />
							<Icon type="downIcon" />
							<Icon type="upIcon" />
						</virtual>
					)
				}}
			</Card>
		</div>
	);
});
```

![Card Widget](assets/blog/version-7-dojo-widgets/cardWidget.png)

The PasswordInput widget is one of several new specialized widget variants. It handles validation state and messaging internally so the developer doesn’t have to.

> src/MyPasswordInput.tsx
```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import PasswordInput from '@dojo/widgets/password-input';

const factory = create();

export default factory(function Basic() {
	return (
		<PasswordInput
			rules={{
				length: {
					min: 4
				},
				contains: {
					atLeast: 2,
					uppercase: 1,
					specialCharacters: 1,
					numbers: 1
				}
			}}
		>
			{{ label: 'Enter Password' }}
		</PasswordInput>
	);
});
```

![Animated password input](assets/blog/version-7-dojo-widgets/passwordInput.gif)

The Form widget provides an opinionated way to use a group of inputs in a form. It features a custom renderer for defining the form’s inputs and provides a middleware for custom functionality.

> src/BasicForm.tsx
```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';

import TextInput from '@dojo/widgets/text-input';
import Form from '@dojo/widgets/form';
import { FormMiddleware } from '@dojo/widgets/form/middleware';

const icache = createICacheMiddleware<{
	basic?: Partial<Fields>;
}>();

const factory = create({ icache });

interface Fields {
	firstName?: string;
	middleName?: string;
	lastName?: string;
	email?: string;
}

const App = factory(function({ middleware: { icache } }) {
	const results = icache.get('basic');

	return (
		<virtual>
			<Form
				name="basicForm"
				onValue={(values) => icache.set('basic', { ...icache.get('basic'), ...values })}
			>
				{({ field }: FormMiddleware<Fields>) => {
					const firstName = field('firstName');
					const middleName = field('middleName');
					const lastName = field('lastName');
					const email = field('email');

					return (
						<virtual>
							<TextInput
								key="firstName"
								placeholder="Enter first name"
								initialValue={firstName.value()}
								onValue={firstName.value}
							>
								{{ label: 'First Name' }}
							</TextInput>
							<TextInput
								key="middleName"
								placeholder="Enter a middle name"
								initialValue={middleName.value()}
								onValue={middleName.value}
							>
								{{ label: 'Middle Name' }}
							</TextInput>
							<TextInput
								key="lastName"
								placeholder="Enter a last name"
								initialValue={lastName.value()}
								onValue={lastName.value}
							>
								{{ label: 'Last Name' }}
							</TextInput>
							<TextInput
								key="email"
								placeholder="Enter an email address"
								initialValue={email.value()}
								onValue={email.value}
								type="email"
							>
								{{ label: 'Email' }}
							</TextInput>
						</virtual>
					);
				}}
			</Form>
			{results && (
				<div key="onValueResults">
					<h2>onValue Results</h2>
					<ul>
						<li>First Name: {results.firstName}</li>
						<li>Middle Name: {results.middleName}</li>
						<li>Last Name: {results.lastName}</li>
						<li>Email: {results.email}</li>
					</ul>
				</div>
			)}
		</virtual>
	);
});

export default App;

```

Check out all of the new Dojo widgets at [https://widgets.dojo.io](https://widgets.dojo.io/)

## Adopting the Latest Recommended Dojo Widget Authoring Patterns

The introduction of function-based widgets fundamentally changed the recommended authoring patterns for Dojo widgets, providing more flexibility and functionality when used in combination with middleware. For simple widgets, the advantages may not be obvious, however, when working on more complex widgets these advantages become more apparent. One of the powerful key features of function-based widgets is being able to support typed children renderers, replacing the current render property pattern. There are several key advantages to using functional children over render properties:

- The Dojo rendering engine deals with the invalidation strategy internally.
- Typed children provide more flexibility when authoring widgets and most importantly more safety for the end user.

For Dojo 7, all widgets are now function-based, written in TSX, and reflect the latest recommended widget authoring patterns.

## Making Widgets More Usable Out of the Box

As part of Dojo 7, all widgets were reviewed for usability issues with an emphasis on improving the developer experience. Property patterns were standardized across widgets and many are now partially controlled, handling their own state. The result is a more consistent and accessible collection of widgets that is usable right out of the box.

### Standardization of Widget Property Patterns

This release brings more consistency to property patterns throughout the widgets library. The result is a reduced learning curve and improved developer experience. Common widget properties are aligned across all widgets, ensuring familiarity for end users.

#### value and onValue

The use of `onInput` / `onChange` / etc has been consolidated into a consistent `onValue` callback. All widgets returning a value will do so using this callback. Additionally, callbacks that previously returned a value or key, such as `onChange` or `onBlur` have been removed or updated to return zero parameters.

#### mouse / touch events

Mouse and touch events have been standardized to use pointer events, allowing for removal of a large number of callbacks. Rather than `mouseIn` and `mouseOut`, widgets now provide `onOver` and `onOut`.

### Partial Control of Widgets

One goal with Dojo 7 is to make widgets work out of box wherever possible, without extra boilerplate for controlling the widget state. As a result, many widgets have been updated to use the `icache` middleware and now maintain their own state. This is accompanied by a standardized `initialValue` property that can control the `value` but does not need to be set each time the `onValue` callback is called. These widgets can still be optionally controlled using the `value` and `onValue` properties for backward compatibility, but we believe this new pattern provides an improvement to the developer experience.

Basic controlled Slider widget, using `value` and `onValue`:
> src/MyControlledSlider
```tsx
import icache from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import Slider from '@dojo/widgets/slider';

const factory = create({ icache });

export default factory(function Controlled({ middleware: { icache } }) {
	const value = icache.getOrSet('value', 50);

	return (
		<Slider
			min={0}
			max={100}
			value={value}
			onValue={(value) => {
				icache.set('value', value);
			}}
		/>
	);
});
```

Basic Slider widget with `initialValue`:
> src/MySlider
```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import Slider from '@dojo/widgets/slider';

const factory = create({});

export default factory(function Basic({}) {
	return <Slider min={0} max={100} />;
});
```


## Improved Theming Experience

A primary goal of the Dojo 7 release is to make widget theming more accessible to end users. To that end, the @dojo/themes repository was deprecated, and themes were moved to @dojo/widgets. This allows developers to start building great looking applications even faster. Additional improvements include the inclusion of a Material theme and support for theme variants.

**Material theme**

The Dojo 7 release brings a new Material theme to widgets. Beyond providing another modern appearance option for Dojo applications, the Material theme serves as an example of theming best practices. Development of the Material theme also helped validate several patterns in Dojo and helped guide the implementation of new features, such as theme variants.

Through the use of css-modules, providing a Material theme for many widgets was as straightforward as composing the appropriate classes from the @material packages.

Example of adding Material theme to the Label widget:

> widgets/src/theme/material/label.m.css
```css
.root {
	composes: mdc-floating-label from '@material/textfield/dist/mdc.textfield.css';
}

.active {
	composes: mdc-floating-label--float-above from '@material/textfield/dist/mdc.textfield.css';
}

.root.secondary {
	position: relative;
}
```

**Theme Variants**

Themes in Dojo 7 now support 'variants'. This allows developers to easily create variations of a theme with minimal duplication. By loading new css-variables, developers can include light, dark, high-contrast, or any number of variants within a theme.

## Revamped Documentation and Examples

This release includes improved widget documentation and examples. The widget documentation site at [widgets.dojo.io](https://widgets.dojo.io) uses the new [@dojo/parade](https://github.com/dojo/parade) package to provide a consistent and up-to-date reference guide. Multiple examples are provided for each widget, and Dojo Parade provides auto-documentation of widget properties and theme class hooks. This new documentation tool is built with Dojo and offers a great tool for building widget documentation and examples from within your application or widget library.

## Migration

All breaking changes in this release were carefully considered and focused on creating the best developer experience. For information on what has changed in Dojo Widgets, please see the [v7 migration guide](https://github.com/dojo/widgets/blob/master/docs/V7-Migration-Guide.md).
