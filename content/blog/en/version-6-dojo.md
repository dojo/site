---
title: Announcing Dojo 6
date: 2019-07-30T08:00:00.000Z
author: Anthony Gubler
---

Since the first major Dojo release last year, we have been working to refine the features and patterns to make Dojo an even more efficient framework for building applications with TypeScript and modern web APIs.

In a world of semantic versioning where even minor breaking changes require a new version number, it is challenging to know when a new version is substantial. Today, we’re excited to announce version 6, our most ambitious set of improvements since the Dojo 2.0 release.

Version 6 of Dojo brings many new features and changes to substantially improve the development experience by reducing boilerplate, increasing flexibility, and further improving performance.

![The image for the blog](assets/blog/version-6-dojo/featured.png)
<!-- more -->

## Function Based Widgets and Middleware

We are very excited to introduce function-based widgets and middleware, the next evolution for creating and working with widgets in Dojo. Function-based widgets and middleware offer an alternative API to the existing class-based APIs (metas, decorators, mixins). A single API for both widgets and middleware helps improve developer ergonomics and reduce the complexity and boilerplate compared to previous releases of the framework, making it even easier to start writing Dojo applications.

What is middleware? Middleware is the singular concept designed to replace all existing supplemental widget patterns, mixins, metas and decorators. A natural progression from the functional and reactive meta API, middleware provides a mechanism that not only facilitates working with imperative and asynchronous APIs reactively, but can get composed with other middleware and also affect a widget’s property interface.

The core primitive for working with function-based widgets and middleware is a new function, `create`, provided by the `vdom` module. The `create` function gets used for defining middleware and properties and returns a factory for creating either widgets or middleware.

> src/MyWidget.tsx
```tsx
import { create, tsx } from '@dojo/framework/core/vdom';

interface MyWidgetProperties {
	label: string;
}

const render = create().properties<MyWidgetProperties>();

export default render(function MyWidget({ properties, children }) {
  const { label } = properties();
	return (
		<div>
			<span>{label}</span>
			<div>{children()}<div>
		</div>
	);
});
```

As mentioned, the middleware design supports composition in order to create advanced custom functionality. The majority of middlewares will build on the set of core middlewares which provide hooks into Dojo’s rendering engine. For more information on the core middleware please see the [Dojo reference guide](/learn/middleware/core-render-middleware).

In addition to the core middleware, we've created a selection of [higher-level Dojo middleware](/learn/middleware/available-middleware) for function-based widgets. These middlewares provide the features and functionality found in most of the existing metas and mixins from working with class-based widgets.

A common pattern used in class-based widgets is to use class properties to store local state for the widget. With function-based widgets this presents a challenge as there is no mechanism to persist state across widget renders. This is where the `icache` - invalidating cache - middleware comes to the forefront. We believe `icache` will be one of the most commonly used middleware when building function-based widgets.

Example simple counter class-based widget using class properties to store the "counter" state and class methods:

> src/ClassCounter.tsx
```tsx
import { tsx } from "@dojo/framework/core/vdom";
import WidgetBase from "@dojo/framework/core/WidgetBase";
import watch from "@dojo/framework/core/decorators/watch";

import * as css from "./Counter.m.css";

interface ClassCounterProperties {
  incrementStep?: number;
}

export class ClassCounter extends WidgetBase<ClassCounterProperties> {
  @watch() private _count = 0;

  private _decrement() {
    const { incrementStep = 1 } = this.properties;
    this._count = this._count - incrementStep;
  }

  private _increment() {
    const { incrementStep = 1 } = this.properties;
    this._count = this._count + incrementStep;
  }

  protected render() {
    return (
      <div classes={[css.root]}>
        <button
          onclick={this._decrement}
          classes={[css.button, css.decrement]}
        />
        <div classes={[css.counter]}>{`${this._count}`}</div>
        <button
          onclick={this._increment}
          classes={[css.button, css.increment]}
        />
      </div>
    );
  }
}
```

Using function-based widgets, we define `icache` middleware for the widget factory so that we can store the counter state across renders. Notice that when we call set on the `icache` we don't need to manually `invalidate` the widget as `icache` implicitly invalidates when a value is set.

> src/FunctionalCounter.tsx
```tsx
interface FunctionalCounterProperties {
  incrementStep?: number;
}

const factory = create({ icache }).properties<FunctionalCounterProperties>();

export const FunctionalCounter = factory(function FunctionalCounter({
  middleware: { icache },
  properties
}) {
  const { incrementStep } = properties();
  const count = icache.get<number>("count") || 0;
  return (
    <div classes={[css.root]}>
      <button
        onclick={() => {
          icache.set("count", count - incrementStep);
        }}
        classes={[css.button, css.decrement]}
      />
      <div classes={[css.counter]}>{`${count}`}</div>
      <button
        onclick={() => {
          icache.set("count", count + incrementStep);
        }}
        classes={[css.button, css.increment]}
      />
    </div>
  );
});
```

For more information please see the [Dojo middleware reference guides](/learn/middleware/introduction) or some of the middleware examples on CodeSandbox:

 * [Dojo `theme` middleware](https://codesandbox.io/s/theme-middleware-4btv7)
 * [Dojo `icache` middleware](https://codesandbox.io/s/advanced-icache-middleware-teeig)

Don't worry, the existing class-based widget APIs are not going away! These enhancements are additive and backwards-compatible, providing what we believe to be an ergonomic improvement on top of the existing widget APIs.

We are really looking forward to seeing the fun and innovative middlewares from the Dojo community, and, as always, please let us know any feedback that you might have!

## Config free Custom Elements

Including Web Components as a first class citizen in Dojo is something that we’ve always been passionate about and now compiling your Dojo widgets to Custom Elements is _even_ easier. In Dojo 6 there is no configuration required, other than defining the widget(s) in the `.dojorc` to instruct the `@dojo/cli-build-widget` to compile your widgets to custom elements. We think this is a significant improvement to current tooling that requires widgets to be explicitly configured with the custom element details. The approach prior to Dojo version 6 required additional development effort, foresight, and created an additional maintenance burden of keeping the configuration up to date with changes to widget properties. This can be seen below with the custom element configuration for an example widget.

Configuration required prior to version 6 for compiling a Dojo widget to a custom element:

> .dojorc
```json
{
  "build-widget": {
    "widgets": [
      "src/MyWidget"
    ]
  }
}
```

> src/MyWidget
```tsx
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { customElement } from '@dojo/framework/core/decorators/customElement';
import { CustomElementChildType } from '@dojo/framework/core/registerCustomElement';

interface MyWidgetProperties {
  value: string;
  disabled: boolean;
  onInput: (input: value) => void;
}

@customElement<MyWidgetProperties>({
	tag: 'dojo-my-widget',
	childType: CustomElementChildType.TEXT,
	properties: ['disabled'],
	attributes: ['value'],
	events: [
		'onInput'
	]
})
class MyWidget extends WidgetBase<MyWidgetProperties> {
  protected render() {
    // rendering
  }
}
```

In Dojo version 6, this is substantially simplified. Now the Dojo build tool's intelligent configuration of custom elements only requires the `.dojorc` entry and will automatically include new, changed or removed properties!

> .dojorc
```json
{
  "build-widget": {
    "widgets": [
      "src/MyWidget"
    ]
  }
}
```

## BTR and Dojo Block Improvements

In version 5 of Dojo, we announced Dojo Blocks, a feature leveraging build time rendering (BTR) that brought the world of static site generation to Dojo. Since then we have been working on improving the experience including more intelligent block bundling, dynamic path registration and a full static mode. Building static and progressive websites has never been easier with Dojo.

Review the [example static blog site with Dojo on CodeSandbox](https://codesandbox.io/s/my-first-blog-bywnn) to learn more about BTR and Dojo Block improvements.

## Widget Library Build

A long awaited and highly requested feature for Dojo has been support for building Dojo widget libraries using the `@dojo/cli-build-widget` command. As part of Dojo 6 we're excited to include a library target for the first time. We are now using this to build the `@dojo/widgets` library and are very excited to see more Dojo widget libraries popping up throughout the community ❤️.

To build your widgets using `@dojo/cli-build-widget`, list your widgets in the `widgets` section of the `.dojorc` and run the build using the `--lib` option. The resulting build output is ready to be packaged and consumed by other Dojo applications.

> .dojorc
```json
{
  "build-widget": {
    "widgets": [
      "src/MyWidget"
    ]
  }
}
```

> terminal
```shell
dojo build widget --lib
```

## Faster Development Builds

As projects grow in size their build times can significantly increase. The CLI build command now supports an experimental "speed" mode that can reduce the build time of larger projects during development.

![experimental Dojo speed demo](assets/blog/version-6-dojo/speed.gif)

This demonstrates saving approximately two seconds when building the [Dojo RealWorld example](https://github.com/dojo/examples/tree/master/realworld) with the experimental speed mode enabled. On larger Dojo projects we've witnessed more significant savings with development build times dropping by more than 50%, e.g. previous builds of more than 40 seconds reduced to under 20 seconds using the new speed mode.

## Glob Support For Code Splitting

The `.dojorc` configuration for `bundles` has been enhanced to support globs. The globs configuration option is especially useful for scenarios such as internationalization, meaning that you do not need to define all language bundles explicitly, instead simply define a matching pattern for each of the locales.

Consider a project with a folder structure that defines language bundles in locale named directories. Ideally the build tool would create a single bundle for each locale that gets loaded when the user changes their locale. Using a glob provides a low maintenance and minimal effort way to do this without explicitly defining every language bundle module in the `.dojorc`.

Prior to Dojo version 6, the configuration required to create a bundle per locale:

> .dojorc
```json
{
  "build-app": {
    "bundles": {
      "fr": [ 
        "src/widgets/home/nls/fr/home",
        "src/widgets/menu/nls/fr/menu",
        "src/widgets/blog/nls/fr/blog",
        "src/widgets/reference/nls/fr/reference"
      ],
      "jp": [ 
        "src/widgets/home/nls/jp/home",
        "src/widgets/menu/nls/jp/menu",
        "src/widgets/blog/nls/jp/blog",
        "src/widgets/reference/nls/jp/reference"
      ]
    }
  }
}
```

Using the glob configuration in Dojo version 6 to create a bundle per locale:

> .dojorc
```json
{
  "build-app": {
    "bundles": {
      "fr": [ "**/fr/*" ],
      "jp": [ "**/jp/*" ]
    }
  }
}
```

## Update to TypeScript

The minimum required TypeScript version has been updated to 3.4. Updating the core framework to use a recent version enables us to leverage the latest features that underpin the function-based widget and middleware typings.

## Revamped Doc Website

// TODO talk about the creation of the new doc website - using BTR and Blocks

## Migration

As usual all of the breaking changes introduced in Dojo 6 are carefully considered, so that we truly believe the benefits outweigh the upgrade effort. To assist with the transition we have updated the CLI upgrade command, which will automatically upgrade your Dojo dependencies, upgrade your application code where possible and highlight areas in the application that require manual intervention. For more information on what has changed in Dojo 6, please see the [migration guide](https://github.com/dojo/framework/blob/master/docs/V6-Migration-Guide.md).

## Support

See the [Dojo version 6 release notes](TODO: Add link) for more details on version 6.0.0 of Dojo!
Love what we’re doing or having a problem? We ❤️our community. [Reach out to the Dojo team on Discord](https://discord.gg/M7yRngE), check out [the Dojo roadmap](/roadmap) and see where we are heading, and try out the new [Dojo on CodeSandbox][https://codesandbox.io/s/github/dojo/dojo-codesandbox-template]. We look forward to your feedback!

