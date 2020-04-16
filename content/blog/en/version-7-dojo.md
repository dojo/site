---
title: Dojo 7.0 Has Arrived
date: 2020-04-20
author: Anthony Gubler
---

We’re excited to announce the latest release of Dojo, a continually evolving, batteries-included, TypeScript web framework. Dojo’s primary goals haven’t changed, and we continue to focus on harmony with the modern web ecosystem, best in class developer ergonomics and intelligent, powerful defaults that enable users to concentrate on building features and applications.

![Announcing Dojo 7](assets/blog/version-7-dojo/featured.jpg)
<!-- more -->

After nearly two years since the first official release of modern Dojo, version 7 provides many new features, bugs fixes and general improvements spanning the entire framework. Major releases have been regular occurrences over the last two years. The latest version 7 release is the most adventurous. This release has taken a few months longer than usual but is worth the wait.

We’re especially proud of the overhaul to the official Dojo widget library, [`@dojo/widgets`](https://github.com/dojo/widgets/), which has been re-thought from the ground up. Dojo widgets have now caught up with the Dojo framework improvements and best practices that have evolved over the last two years. Further details are available in the [Dojo widget release blog](https://dojo.io/blog/dojo-7-widgets).

For `@dojo/framework` and friends, version 7 primarily focuses on building on the function-based widget and middleware authoring patterns from Dojo 6. This effort helps make building applications more straightforward than ever, continues improving the developer experience and ergonomics, and further refines Dojo's Web Component Custom Element support.

## Typed Widget Children

Function-based widgets have empowered Dojo to deliver features that were extremely difficult with the Class-based widget authoring pattern. Render properties were getting used as a workaround to being able to implement functionality for widgets where properties need to get passed back to the user to render output that effectively gets used as children. Although this pattern works, it comes with some significant gotchas, as the property needs to get treated like children by Dojo's rendering engine. Still, Dojo was not able to do so, meaning that the author was left to ensure that the widget always re-renders to guarantee that the render properties output is not stale.

Now with function-based widgets, it is possible to specify the expected type(s) of the children as functions or objects. In doing so, this ensures that Dojo knows that the widget has children and provides all the correct rendering paths get followed.

Previously in Dojo 6, using a render property called `renderer`:

```tsx
import { create, tsx, diffProperty, invalidator } from '@dojo/framework/core/vdom';
import { RenderResult } from '@dojo/framework/core/interfaces';
import icache from '@dojo/framework/core/middleware/icache';

interface MyWidgetProperties {
    renderer(active: boolean): RenderResult;
}

const factory = create({ icache, diffProperty, invalidator }).properties<MyWidgetProperties>();

const MyWidget = factory(function MyWidget({ properties, middleware: { icache, diffProperty, invalidator } }) {
    // need to tell the widget to always re-render to ensure that the
    // latest output from the `renderer` property is reflected accurately
    diffProperty('renderer', () => {
        invalidator();
    });
    const { renderer } = properties();
    const active = icache.getOrSet('active', true);
    return (
        <div>{renderer(active)}</div>
        <button onclick={() => {
            icache.set('active', icache.getOrSet('active', true));
        }}>{`Set ${active ? 'inactive' : 'active'}`}</button>
    );
});

// Usage
<MyWidget renderer={(active) => {
    return <div>{`${active ? 'ACTIVE' : 'NOT ACTIVE'}`}</div>
}}/>
```

In Dojo 7 using a typed functional child, the renderer gets passed as the widget's child instead of as a property.

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

Typed children can be even more expressive by using an object that describes children for different sections of the widget, referred to as named children. For example, a `Card` widget could have `title`, `avatar`, and `content` that can get defined by a user. Using standard children, there is no clear way for a user to define the output required for each, and using render properties still have all the original downsides of the pattern. However with named children, an object can be used to indicate the purpose of the child and whether they are mandatory or optional.

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
                {title()}
            </div>
            <span classes={[css.avatar]}>
                {avatar()}
            </span>
            <div classes={[css.content]}
                {content()}
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

Dojo's support for the Custom Elements portion of Web Components provides interoperability with other frameworks and component systems, not only consuming custom elements in the framework but building Dojo widgets as custom elements. Developer ergonomics are even more important with custom elements, to ensure that the Dojo custom elements can get used with minimal effort, in the declarative way they get designed.

Working with Dojo 6 compiled custom elements that used the render property pattern did not allow the custom elements to be used effectively, however, in Dojo 7 widgets that use functional children in place of a render property can use the custom element declaratively like standard HTML.

```html
<dojo-my-widget>
    <div>My content for the widget</div>
</dojo-my-widget>
```

For widgets that take advantage of the named children pattern, the children can also be declaratively defined using the new "slots" attribute to indicate which section of the widget's children the node is intended for. Using the `Card` widget example above, this would look something like:

```html
<dojo-card>
    <div slot="title">My Title</div>
     <img slot="avatar" src="https://my-content.com/avatar.png"/>
     <div slot="content">My Main Content!</div>
</dojo-card>
```

For more details visit the new [custom element reference guide](https://dojo.io/learn/custom-elements).

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

For more information, please see the [resource reference guide](https://dojo.io/learn/resources).

## A Safer Way of Testing

As part of Dojo 7 testing in Dojo has been given an overhaul to provide support for new features such as functional children, type safety when working with assertion template the new test renderer and general updates that promote testing best practices.

The key concept for the new renderer is creating wrapping nodes or widgets that are used within a tests `assertionTemplate`, in place of the real widget. This provides the assertion templates type information based on the wrapped widget and enables identifying the node or widget in the assertion template structure. The same is true for the test renderer itself that working with properties and children can be done in a type-safe way, using the location of the wrapped test node in the assertion template structure to call properties and resolve functional and name children.

```tsx
import { tsx } from '@dojo/framework/core/vdom';
import renderer, { wrap, compare } from '@dojo/framework/testing/renderer';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import MyWidget from './MyWidget';
import Button from './Button';
import Card from './Card';

// create a wrapped node for anything that needs to be used with the renderer or assertion template api
const WrappedButton = wrap(Button);
const WrappedRoot = wrap('div');
const WrappedCard = wrap(Card);

// create the base template with the wrapped nodes
// in place of the real node/widget
const baseTemplate = assertionTemplate(() => (
    // use `compare` with any property on a wrapped node to pass a custom comparator
    <WrappedRoot id={compare((actual) => typeof actual === 'string')}>
        <WrappedButton onClick={() => {}} />Show</WrappedButton>
    </WrappedRoot>
));

// initialize the test renderer
const r = renderer(() => <MyWidget />);

// Always expect the default render state
r.expect(baseTemplate);

// register calling a property using a wrapped node, this will not be called until
// the next expect assertion
r.property(WrappedButton, 'onClick');

// describe how to resolve functional children
r.child(WrappedCard, [{ header: [], content: [] }]);

// create a new template using the wrapped nodes to target the changes required
const cardTemplate = baseTemplate
    .setProperty(WrappedRoot, 'classes', [css.open])
    .insertAfter(WrappedButton, () => (
        <Card>{{
            header: () => <h1>Header</h1>,
            content: () => <div>Content</div>
        }}
        </Card>
    ));

// expect against the updated template the properties will get called before the widget re-renders
r.expect(cardTemplate);

r.property(WrappedButton, 'onClick');
r.expect(baseTemplate);
```

The existing harness exists in the `@dojo/framework/testing/harness` directory. It will be supported at least through to Dojo 9, giving time for applications to update their existing tests to use the new test renderer. The `harness` imports will automatically be updated when upgrading your application using the `cli-upgrade-app` Dojo CLI command.

For more details, visit the [testing reference guide](https://dojo.io/learn/testing).

## Routing, Routing, Routing

The concept of an `Outlet` in the Dojo routing has always been synonymous with each unique route, essentially the `id` of the route itself. An `Outlet` always reflected a single `Route`. As such, the `Outlet` widget is now known as `Route`. With the routing configuration requiring a unique `id` for every route, this will usually be the same value previously used for the `Outlet` name.

Making this change in routing enables the existing `Outlet`s concept to change from being tied to a specific route to represent instead a section of the application that the routing system can render, varying the content based on the matched route. This leads to less duplication in application code for each route and allows outlets in the routing configuration to more accurately describe the application layout.

Consider a typical application layout which includes a left side menu and the main content view that depending on the route has a right-hand sidebar:

```
-------------------------------------------------------------------
|        |                                            |           |
|        |                                            |           |
|        |                                            |           |
|        |                                            |           |
|        |                                            |           |
|  menu  |                   main                     | side-menu |
|        |                                            |           |
|        |                                            |           |
|        |                                            |           |
|        |                                            |           |
|        |                                            |           |
-------------------------------------------------------------------
```

```tsx
const routes = [
    {
        id: 'landing',
        path: '/',
        outlet: 'main',
        defaultRoute: true
    },
    {
        id: 'widget',
        path: 'widget/{widget}',
        outlet: 'side-menu',
        children: [
            {
                id: 'tests',
                path: 'tests',
                outlet: 'main'
            },
            {
                id: 'overview',
                path: 'overview',
                outlet: 'main'
            },
            {
                id: 'example'
                path: 'example/{example}',
                outlet: 'main'
            }
        ]
    }
];
```

In the routing configuration above, there are two outlets defined, `main` and `side-menu`, and a simplified application layout using outlets is shown below. By default, the `Outlet` renders any of the keys equal to a route id that gets matched for the outlet, in this case, `main`. If a function gets passed to the `Outlet` then it will render whenever _any_ route gets matched for the outlet specified.

```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import Menu from './Menu';
import SideMenu from './SideMenu';
import Landing from './Landing';
import Tests from './Tests';
import Example from './Example';

const factory = create();

const App = factory(function App() {
    return (
        <div>
            <Menu />
            <main>
                <div>
                    <Outlet id="main">
                        {{
                            landing: <Landing />,
                            tests: <Tests />,
                            example: ({ params: { example }}) => <Example example={example}/>,
                            overview: <Example example="overview"/>
                        }}
                    </Outlet>
                </div>
                <div>
                    <Outlet id="side-menu">
                        {({ params: { widget }}) => <SideMenu widget={widget}>}
                    </Outlet>
                </div>
            </main>
        </div>
    );
});
```

To assist with the migration from `Outlet` to `Route` and updating the routing configurations to include an `id` for each route the `@dojo/cli-upgrade-app` command is available.

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
            {data ? <ul>{data.map((item) => <li>{item}</li>)}</ul> : <div>Laoding...</div>}
        </div>
    );
});
```

## Smarter i18n

Dojo 7 includes considerable improvements to the in-built i18n support with all CLDR data now automatically included based on the locales defined in the application's `.dojorc` and the i18n usage within the application. The CLDR is also split into targeted bundles that are loaded on-demand when the locale changes. This massively reduces the up-front bundle cost that a user pays for a feature that they may never require or use.

There should be zero to very minimal changes required for application, to take advantage of these improvements. Simply ensure that all the supported locales are defined in the application's `.dojorc` (as they should already be) and enjoy smaller, smarter i18n.


```json
{
    "build-app": {
        "locale": "en",
        "supportedLocales": ["fr", "de"]
    }
}
```

## Runtime theme variants

<!-- TODO -->

-   Improvements to themes to enable switching theme variants at runtime
-   Themes could always be switched but switching CSS vars for a theme at runtime was a no go

## Better BTR Developer Experience

-   Auto discover
-   Ondemand BTR for development

<!-- TODO -->

## Dojo Parade, show off your widgets

<!-- TODO -->

## Creating widget libraries

-   Create skeleton widget library

<!-- TODO -->

After eight busy months, it’s a pleasure to announce the release, but rest assured the work is not done, and over the next few weeks, we’ll be planning the goals for the next release and updating the roadmap.

## Migration

As usual with modern Dojo releases, all breaking changes introduced in Dojo releases are carefully considered, so that we truly believe the benefits outweigh the upgrade effort. To assist with the transition, we have updated the CLI upgrade command, which will automatically upgrade your Dojo dependencies, upgrade your application code where possible, and highlight areas in the application that require manual intervention. For more information on what has changed in Dojo 7, please see the version 6 to 7 migration guide.

## Support

See the Dojo version 7 release notes for more details on version 7.0.0 of Dojo! Love what we’re doing or having a problem? We ❤️ our community. Reach out to the Dojo team on Discord, check out the Dojo roadmap and see where we are heading, and try out Dojo 7.0.0 on CodeSandbox. We look forward to your feedback!


