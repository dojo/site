---
title: Announcing Dojo 6.0.0
date: 2019-07-30T08:00:00.000Z
author: Anthony Gubler
---
## Annoucing Dojo 6.0.0!

Since the first major Dojo release last year, we have been working to refine the features and patterns to make Dojo an even more efficient framework for building applications with TypeScript and modern web APIs.

In a world of semantic versioning where even minor breaking changes require a new version number, it is challenging to know when a new version is substantial. Today, we’re excited to announce version 6, our most ambitious set of improvements since the Dojo 2.0 release.

Version 6 of Dojo brings many new features and changes to substantially improve the development experience when creating applications with Dojo by reducing boilerplate, increasing flexibility, and further improving performance.

![The image for the blog](/assets/blog/version-6-dojo/featured.png)
<!-- more -->

## Function Based Widget and Middleware

We are very excited to introduce function-based widgets and middleware, the next evolution for creating and working with widgets in Dojo. Function-based widgets and middleware offer an alternative API for Dojo widgets to the existing class-based APIs (metas, decorators, mixins). A single API for both widgets and middleware helps improve developer ergonomics and reduce the complexity and boilerplate with previous releases of Dojo, making it even easier to get started with Dojo.

What is middleware? Middleware is the singular concept designed to replace all existing supplemental widget patterns, mixins, metas and decorators. A natural progression from the functional and reactive meta API, middleware provides a mechanism that not only facilitates working with imperative and asynchronous APIs reactively, but can get composed with other middleware and also affect a widget’s property interface.

The core primitive for working with function-based widgets and middleware is a new function, `create`, provided by the `vdom` module. The `create` function gets used for defining middleware and properties and returns a factory for creating either widgets or middleware.

```tsx
import { create, tsx } from '@dojo/framework/core/vdom';

interface MyWidgetProperties {
	label: string;
}

const render = create().properties<MyWidgetProperties>();

export default render(function MyWidget({ properties, children }) {
	return (
		<div>
			<span>{properties.label}</span>
			<div>{children}<div>
		</div>
	);
});
```

As mentioned, the middleware design supports composition in order to create advanced custom functionality. The majority of middlewares will build on the set of core middlewares which provide hooks into Dojo’s rendering engine. For more information on the core middleware please see the [Dojo reference guide](https://dojo.io).

In addition to the core middleware, Dojo also provides a selection of higher-level middleware for function-based widgets. This middleware provides the features and functionality found in most of the existing metas and mixins from working with class-based widgets, for example Resize Observers and Intersection Observers TODO: Verify this last part after for example.

// TODO words describing the comparison between working with “local” state and event handlers between class and functional widgets.

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

```tsx
interface FunctionalCounterProperties {
  incrementStep?: number;
}

const factory = create({ icache }).properties<FunctionalCounterProperties>();

export const FunctionalCounter = factory(function FunctionalCounter({
  middleware: { icache },
  properties: { incrementStep }
}) {
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

For more information please see the middleware reference guides on [dojo.io](https://dojo.io) or see some of the examples we have created on codesandbox: [`theme` middleware](https://codesandbox.io/s/theme-middleware-4btv7), [`icache` middleware](https://codesandbox.io/s/advanced-icache-middleware-teeig).

The existing widget APIs are not going away. These enhancements are additive and backwards-compatible, providing what we believe to be an ergonomic improvement on top of the existing widget APIs.

We are really looking forward to seeing the fun and innovative middlewares from the Dojo community, and, as always, please let us know any feedback that you might have!

## BTR and Dojo Block Improvements

In version 5 of Dojo, we announced Dojo Blocks, a feature leveraging build time rendering (BTR) that brought the world of static site generation to Dojo. Since then we have been working on improving the experience including more intelligent block bundling, dynamic path registration and a full static mode. Building static and progressive websites has never been easier with Dojo.

Please check out our [example static blog site with Dojo on codesandbox](https://codesandbox.io/s/my-first-blog-bywnn).

## Better Custom Elements

Dojo has supported exporting widgets as custom elements since the initial release using `@dojo/cli-build-widget`. However, exporting widgets required some manual configuration to define details such as the custom element tagname along with the properties, attributes and events. From Dojo 6, all the attributes, properties and events are inferred from the widget properties interface and the tagname name defined in the `.dojorc` configuration file.

**Note:** Currently exporting custom elements is not supported with function-based widgets. This is something that we'll be working on over the next few months.

## Widget Library Build

A long awaited feature for us at Dojo was built in support for building Dojo widget libraries using the `@dojo/cli-build-widget` command. We are using this command to build our own widget library and are excited to see more Dojo widget libraries popping up throughout the community ❤️.

## Glob Support For Code Splitting

The `.dojorc` configuration for bundle has been enhanced to support globs. This especially useful for scenarios such as internationalization meaning that you don't have to define all the language bundles, instead simply define a matching pattern for each of the locales.

## Update to TypeScript

The minimum required TypeScript version has been updated to 3.4. Updating the core framework to use a recent version enables us to leverage the latest features that underpin the function-based widget and middleware typings.

## Dojo Widgets

Version 6 of `@dojo/widgets` builds upon its input widgets by adding `helperText` and a consistent approach to validation.

`helperText` displays a message below the input to which it gets applied to provide extra context. The `helperText` also doubles as the location of the error message when used with the `valid` property.

The change from `invalid` to `valid` and `onValidate` provides a mechanism to reactively validate and display error messages beneath a widget. In the case of `text-input`, this is further supplemented by native browser validation meaning that properties such as `required`, `pattern`, `max`, `min`, etc. will trigger an `onValidate` callback with the result of native validation.

We have added `Snackbar` and `Card` widgets to the Dojo widget library as well as adding `Raised` and `Outline` variations of the `Button` widget. This is the start of a larger initiative to support a material design theme in the future as well as a selection of the components material design offers.

Finally, we have started writing our new widgets using TSX syntax. We may convert existing widgets to use TSX in the future if we make any extensive changes to them.

## Revamped Doc Website

// TODO talk about the creation of the new doc website - using BTR and Blocks

## Migration

As usual all of the breaking changes introduced in Dojo 6 are carefully considered, so that we truly believe the benefits outweigh the upgrade effort. To assist with the transition we have updated the CLI upgrade command, which will automatically upgrade your Dojo dependencies, upgrade your application code where possible and highlight areas in the application that require manual intervention. For more information on what has changed in Dojo 6, please see the [migration guide](TODO Add link).

## Support

See the [release notes](TODO: Add link) for more details on version 6.0.0 of Dojo!
Love what we’re doing or having a problem? We ❤️our community. [Reach out to us on Discord](https://discord.gg/M7yRngE), check out [the Dojo roadmap](https://github.com/dojo/meta/wiki/Roadmap#future-ideas) and see where we are heading, and try out the new [Dojo on CodeSandbox][https://codesandbox.io/s/github/dojo/dojo-codesandbox-template]. We look forward to your feedback!

