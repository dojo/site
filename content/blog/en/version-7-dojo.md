---
title: Dojo 7.0 Has Arrived
date: 2020-04-22
author: Anthony Gubler
---

We’re excited to announce the latest release of Dojo, a continually evolving, batteries-included, TypeScript web framework. Dojo’s primary goals haven’t changed, and we continue to focus on harmony with the modern web ecosystem, best in class developer ergonomics and intelligent, powerful defaults that enable users to concentrate on building features and applications.

![Announcing Dojo 7](assets/blog/version-7-dojo/featured.png)

<!-- more -->

After nearly two years since the first official release of modern Dojo, version 7 provides many new features, bug fixes and general improvements spanning the entire framework. Major releases have been regular occurrences over the last two years. The latest version 7 release is the most adventurous. This release has taken a few months longer than usual but is worth the wait.

We’re especially proud of the overhaul to the official Dojo widget library, [`@dojo/widgets`](https://github.com/dojo/widgets/), which has been re-thought from the ground up. Dojo widgets have now caught up with the Dojo framework improvements and best practices that have evolved over the last two years. Further details are available in the [Dojo widget release blog](https://dojo.io/blog/dojo-7-widgets).

For `@dojo/framework` and friends, version 7 primarily focuses on building on the function-based widget and middleware authoring patterns from Dojo 6. This effort helps make building applications more straightforward than ever, continues improving the developer experience and ergonomics, and further refines Dojo's Web Component Custom Element support.

## Typed Widget Children

Function-based widgets have empowered Dojo to deliver features that were extremely difficult with the Class-based widget authoring pattern. Render properties were getting used as a workaround to being able to implement functionality for widgets where properties need to get passed back to the user to render output that effectively gets used as children. Although this pattern works, it comes with some significant gotchas, as the property needs to get treated like children by Dojo's rendering engine. Unfortunately this isn't something that Dojo can do automatically, meaning that the author was left to ensure that the widget always re-renders to guarantee that the render properties output is not stale.

Now with function-based widgets, it is possible to specify the expected type(s) of the children as functions or objects. In doing so, this ensures that Dojo knows that the widget has children and all the correct rendering paths get followed.

```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import icache from '@dojo/framework/core/middleware/icache';

interface MyWidgetChildren {
    (active: boolean): RenderResult;
}

const factory = create({ icache }).children<MyWidgetChildren>();

const MyWidget = factory(function MyWidget({ children, middleware: { icache } }) {
    const [ child ] = children();
    const active = icache.getOrSet('active', true);
    return (
        <div>{child(active)}</div>
        <button onclick={() => {
            icache.set('active', icache.getOrSet('active', true));
        }}>{`Set ${active ? 'inactive' : 'active'}`}</button>
    );
});

// Usage
<MyWidget>{(active) => <div>{`${active ? 'ACTIVE' : 'NOT ACTIVE'}`}</div>}</MyWidget>
```

Typed children can be even more expressive by using an object that describes children for different sections of the widget, referred to as named children. For example, a `Card` widget could have `title`, `avatar`, and `content` that can get defined by a user. Using standard children, there is no clear way for a user to define the output required for each, and using render properties still have all the original downsides of the pattern. However, with named children an object can get used to indicate the purpose of the child and whether they are mandatory or optional.

```tsx
import { create, tsx } from '@dojo/framework/core/vdom';

import * as css from './Card.m.css';

interface CardChildren {
    title: RenderResult;
    avatar: RenderResult;
    content: RenderResult;
}

const factory = create().children<CardChildren>();

const Card = factory(function Card({ children }) {
    const [{ title, avatar, content }] = children();
    return (
        <div>
            <div classes={[css.title]}>
                {title}
            </div>
            <span classes={[css.avatar]}>
                {avatar}
            </span>
            <div classes={[css.content]}
                {content}
            </div>
        </div>
    );
});

// Usage
<Card>{{
    title: 'My Title',
    avatar: <img src="https://my-content.com/avatar.png"/>,
    content: <div>My Main Content!</div>
}}</Card>
```

## Custom Elements, Improved

Dojo's support for the Custom Elements portion of Web Components provides interoperability with other frameworks and component systems, not only consuming custom elements in the framework but building Dojo widgets as custom elements. Developer ergonomics are even more important with custom elements, to ensure that the Dojo custom elements can get used, with minimal effort, in the declarative way they are designed.

Working with Dojo 6's compiled custom elements that used the render property pattern did not allow the custom elements to get used effectively. However, in Dojo 7, widgets that use functional children in place of a render property can use the custom element declaratively like standard HTML.

```html
<dojo-my-widget>
	<div>My content for the widget</div>
</dojo-my-widget>
```

For widgets that take advantage of the named children pattern, the children can also be declaratively defined using the new "slots" attribute to indicate which section of the widget's children the node is intended for. Using the `Card` widget example above, this would look something like:

```html
<dojo-card>
	<div slot="title">My Title</div>
	<img slot="avatar" src="https://my-content.com/avatar.png" />
	<div slot="content">My Main Content!</div>
</dojo-card>
```

The slot feature for Dojo custom elements provides the equivalent support that slots solve for [native custom elements.](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots). For more details visit the new [Dojo custom element reference guide](https://dojo.io/learn/custom-elements).

## Bringing widgets and data together

Dojo 7 makes widgets data-aware with the addition of resources and the new data middleware. This allows a user to create a single sharable resource which can be passed to multiple widgets without them having any knowledge of how the data is fetched or where it is coming from. This provides a single consistent approach to working with data, capable of pagination and filtering. We've implemented this pattern in the new List / Select and Typeahead widgets meaning you can get up and running with resources right away.

```tsx
import { DataTemplate, createResource } from '@dojo/framework/core/resource';
import { fetcher } from './personfetcher';
import { List } from './List';

const template: DataTemplate = {
	read: fetcher
};

const resource = createResource(template);

export default factory(function() {
	return <List resource={resource} />;
});
```

The new data middleware allows widgets to read and set queries on the data resource by providing a simple API that enables a set of Options to get shared between multiple widgets. This approach makes building more complex widgets such as typeaheads or loading indicators much simpler as they need only make calls to the data middleware using the shared Options provided.

```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import { data } from '@dojo/framework/core/middleware/data';

const factory = create({ data });

export const List = factory(function Select({ middleware: { data } }) {
	const { getOrRead, getOptions } = data();

	const items = getOrRead(getOptions());
});
```

For more information, please see the [rojo Resources reference guide](https://dojo.io/learn/resources).

## Dojo test renderer

As part of the Dojo 7 release, testing in Dojo has been given an overhaul to provide support for new features such as functional children, type-safe APIs and general updates that promote testing best practices.

There are five main components to the new test renderer:

-   `renderer`
    -   The function used to render widgets in the test environment.
-   `assertion`
    -   An assertion builder which can be expected against the test renderer.
-   `wrap`
    -   A function that wraps widgets and nodes to be used as a type-safe selector when interacting with assertions and the test renderer.
-   `ignore`
    -   A utility function to exclude nodes from an assertion
-   `compare`
    -   A custom comparator for node properties that can be used with a wrapped test node

The key concept for the new renderer is using the `wrap` function to create wrapped test nodes and widgets that are used within a tests `assertion`, in place of the real widget. This provides the assertions type information based on the wrapped widget and enables identifying the node or widget in the assertion template structure. The same is true for the test renderer itself that working with properties and children can be done in a type-safe way, using the location of the wrapped test node in the assertion template structure to call properties and resolve children.

The current harness exists in the `@dojo/framework/testing/harness` directory. It will be supported through at least version 9 of Dojo, giving time for applications to update their existing tests to use the new test renderer. The `harness` imports will automatically be updated when upgrading your application using the `cli-upgrade-app` Dojo CLI command.

For more details about the new test renderer, visit the [testing reference guide](https://dojo.io/learn/testing).

## Simplified routing and outlets

The concept of an `Outlet` in the Dojo routing has always been synonymous with each unique route, essentially the `id` of the route itself. An `Outlet` always reflected a single `Route`. As such, the `Outlet` widget is now known as `Route`. With the routing configuration requiring a unique `id` for every route, this will usually be the same value previously used for the `Outlet` name.

Making this change in routing enables the existing `Outlet`s concept to change from being tied to a specific route to represent instead a section of the application that the routing system can render, varying the content based on the matched route. This leads to less duplication in application code for each route and allows outlets in the routing configuration to more accurately describe the application layout.

To assist with the migration from `Outlet` to `Route` and updating the routing configurations to include an `id` for each route the `@dojo/cli-upgrade-app` command is available.

For more details, visit the [routing reference guide](https://dojo.io/learn/routing/outlets).

## Custom widget keys

For widgets that contain more business logic, for example fetching remote data based on a specific property value, catering for all the scenarios that data needs to get cleared and re-fetched based on the property value changing are complicated and can lead to some subtle bugs in application behavior.

In previous versions of Dojo, users can use the property value as the widget key to instruct Dojo to re-create the widget when the value changes, but this was left to the user to manage and there was no way to enforce this pattern.

In Dojo 7, authors can select a widget's property that Dojo will use in addition to the existing `key` property to indicate that a widget needs to get re-created. This is powerful because authors can control and guarantee the behavior from Dojo and do not need to deal with the complicated scenarios to "reset" a widget when the property value changes.

```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

interface MyWidgetProperties {
	id: string;
}

// specifying a key will instruct Dojo to include that property along with `key`
// in determining if the widget needs to be recreated.
const factory = create()
	.properties<MyWidgetProperties>()
	.key('id');

const MyWidget = factory(function MyWidget({ properties, middleware: { icache } }) {
	const data = icache.getOrSet('data', async () => {
		const { id } = properties();
		const response = await fetch(`https://my-remote-service/v1/company/${id}/people'`);
		const data = await response.json();
		return data;
	});
	return (
		<div>
			<h2>Company Employees</h2>
			{data ? (
				<ul>
					{data.map((item) => (
						<li>{item}</li>
					))}
				</ul>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
});
```

## Smarter i18n

Dojo 7 includes considerable improvements to the in-built i18n support with all CLDR data now automatically included based on the locales defined in the application's `.dojorc` and the i18n usage within the application. The CLDR is also split into targeted bundles that are loaded on-demand when the locale changes. This massively reduces the up-front bundle cost that a user pays for a feature that they may never require or use.

There should be zero to very minimal changes required for applications to take advantage of these improvements. Simply ensure that all the supported locales are defined in the application's `.dojorc` (as they should already be) and enjoy smaller, smarter i18n.

```json
{
	"build-app": {
		"locale": "en",
		"supportedLocales": ["fr", "de"]
	}
}
```

## Runtime theme variants

The themes provided by Dojo have always been built using CSS variables that define aspects such as color and sizing, however, it has not been easily possible to create a variant of a theme by providing a separate set of CSS variables. This is due to the variable being defined at the `:root` level on the document body.

Dojo 7 introduces some changes designed to solve this issue. Variables are no longer required to get imported into each individual CSS file, instead the theme itself has been updated to contain both the theme CSS for each widget and a set of variants that specify all the required CSS variables. These variables are no longer defined at the `:root:` but instead under a class named `.root`. When setting a theme for a widget or application, the specific variant can get set beside it and is made available by the `theme` middleware or `Themed` mixin using `theme.variant()` and `this.variant()` respectively. This "variant" class is required to get set on the outer node of a widget to ensure that the widget uses the correct CSS variables.

```tsx
import * as MyWidget from './MyWidget.m.css';

import * as light from './variants/light.m.css';
import * as dark from './variants/dark.m.css';

export default {
    theme: {
        'my-project/MyWidget'
    },
    variants: {
        default: light,
        light,
        dark
    }
}
```

And using the `theme.variant()` function to apply the current variant to the root of the widget:

```tsx
const MyWidget = factory(function MyWidget({ middleware: { theme } }) {
    const themedCss = theme.classes(css);
    return (
        <div classes={[theme.variant(), themedCss.root]}>
    );
});
```

With widgets setup to use the variant's class name, switching the variant at runtime gets done by using the `theme` middleware:

```tsx
import myTheme from './my-theme';

const App = factory(function App({ middleware: { theme } }) {
	return (
		<button
			onclick={() => {
				theme.set(myTheme, 'dark');
			}}
		>
			dark mode
		</button>
	);
});
```

## Dojo CLi Improvements

Two big improvements to using the Dojo CLI are included in version 7, the first is validation for `.dojorc` config values. If there are unsupported or incorrect config values detected, an error gets output to the console. The second is support for composing `.dojorc` configuration to reduce duplication and maintenance using the `extends` key pointing to the config from which to extend.

## Better BTR developer experience

Dojo 7 introduces some significant improvements to the developer experience when working with build time rendering. The first is a new option, that is enabled by default to automatically discover pages to build, using the `build-time-render` options in the `.dojorc`, `discoverPaths`. The second is an on demand build time rendering mode that is turned on when working with the `watch` and `serve` cli-build-app flag. After the initial build, pages will only be built when they are visited in the browser, significantly speeding up the development experience.

## Dojo Parade, show off your widgets

Dojo Parade is a brand new package for building widget documentation and examples from within you application or widget library. `@dojo/widgets` is using Dojo Parade for its documentation, that can be seen at https://widgets.dojo.io, it's early days for Dojo Parade and we have lots of ideas on how we can improve on what we have now, but we wanted to get this released early so we can hear feedback and ideas from our community and most importantly everyone can benefit from thorough documentation for their widgets.

## Creating widget libraries

To complement the `cli-create-app` command, the existing `cli-create-widget` command has been converted to fulfill a higher destiny. The new `cli-create-widget` command in Dojo 7 will scaffold a skeleton widget library with all the tooling and documentation that we use in `@dojo/widgets`. We really hope this helps kickstart community-led widget projects!

```shell
dojo create widget --name my-dojo-widget-lib
```

## Update to TypeScript Support

Dojo 7 has been tested and verified up to the latest released version, currently TypeScript 3.8, which includes enhancements such as optional chaining that landed in TypeScript 3.7. Dojo continues to support TypeScript 3.4.5 and greater.

## Seamless ZEIT Now Support

Over the last couple of months we have been working with the ZEIT team to get Dojo setup for seamless, zero configuration [Vercel deployment](https://vercel.com/blog/zeit-is-now-vercel), it's now even easier to deploy your next Dojo application.

## What's next?

After eight busy months, it’s a pleasure to announce the release, but rest assured the work is not done, and over the next few weeks, we’ll be planning the goals for the next release and updating the [Dojo roadmap](https://dojo.io/roadmap).

## Migration

As usual with modern Dojo releases, all breaking changes introduced in Dojo releases are carefully considered, so that we truly believe the benefits outweigh the upgrade effort. To assist with the transition, we have updated the CLI upgrade command, which will automatically upgrade your Dojo dependencies, upgrade your application code where possible, and highlight areas in the application that require manual intervention. For more information on what has changed in Dojo 7, please see the version 6 to 7 migration guide.

## Support

See the Dojo version 7 release notes for more details on version 7.0.0 of Dojo! Love what we’re doing or having a problem? We ❤️ our community. Reach out to the Dojo team on Discord, check out the [Dojo roadmap](https://dojo.io/roadmap) and see where we are heading, and try out Dojo 7.0.0 on [CodeSandbox](https://codesandbox.io/s/github/dojo/dojo-codesandbox-template). We look forward to your feedback!
