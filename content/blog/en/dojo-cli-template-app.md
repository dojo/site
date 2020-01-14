---
title: Scaffolding your first Dojo app with the Dojo CLI
date: 2020-01-13
author: Anthony Gubler
---

![Dojo CLI](assets/blog/dojo-cli-template-app/featured.svg)

<!-- more -->

It is easy to get started with Dojo using the Dojo CLI and create app command to scaffold a new project using the dojo template application. First install both `@dojo/cli` and `@dojo/cli-create-app` globally.

```shell
npm install @dojo/cli @dojo/cli-create-app -g
```

The `@dojo/cli-create-app` command provides a number of options to customize the template application. By default the template application uses the programmatic API (however for this blog we'll be using `--tsx` to create an application template that uses TSX) and provides theming and routing out of the box so you can quickly get started with some features that you will leverage in a larger application.

To create the template application run the dojo cli create app command providing the application name

```shell
dojo create app --name my-first-dojo-app --tsx
```

If you don't want to install the dependencies globally, you can also use [`npx`](https://www.npmjs.com/package/npx) to create your first dojo application.

```shell
npx -p @dojo/cli-create-app -p @dojo/cli -- dojo create --name my-first-dojo-app --tsx
```

Now let's take a look at the structure you get with the new template application.

![create app structure](assets/blog/dojo-cli-template-app/create-app-structure.svg)

More details about routing are found in the [Dojo routing documentation](https://dojo.io/learn/routing/introduction). The key concept here is that each view for a route is defined by an `Outlet`, a wrapper for widgets that gets displayed in view of that route.

```tsx
// src/App.tsx
import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Outlet from '@dojo/framework/routing/Outlet';
import dojo from '@dojo/themes/dojo';

import Menu from './widgets/Menu';
import Home from './widgets/Home';
import About from './widgets/About';
import Profile from './widgets/Profile';

import * as css from './App.m.css';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}
	return (
		<div classes={[css.root]}>
			<Menu />
			<div>
				<Outlet key="home" id="home" renderer={() => <Home />} />
				<Outlet key="about" id="about" renderer={() => <About />} />
				<Outlet key="profile" id="profile" renderer={() => <Profile username="Dojo User" />} />
			</div>
		</div>
	);
});
```

Ok, so let's break this down a bit. The application is using TSX to create virtual DOM nodes. In this case there is a top level `Menu` with a `div` underneath. Within this `div` each Outlet gets defined with an `id`, `key` (optional), and what to display gets specified in the **render** method.

We won't go into detail for each view as they are fairly standard Dojo widgets, but let's take a look at the routing aspect. Routes get defined in a simple object.

```ts
// src/routes.ts
export default [
	{
		path: 'home',
		outlet: 'home',
		defaultRoute: true
	},
	{
		path: 'about',
		outlet: 'about'
	},
	{
		path: 'profile',
		outlet: 'profile'
	}
];
```

Each route has a path, with the name of the outlet `id`, which simply coincides with the `id` of the outlet defined in the previous snippet. You can also see that the home route is defined as the **`defaultRoute`**.

Here is how the examples comes together.

```tsx
// src/main.tsx
import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import '@dojo/themes/dojo/index.css';

import routes from './routes';
import App from './App';

const registry = new Registry();
registerRouterInjector(routes, registry);

const r = renderer(() => <App />);
r.mount({ registry });
```

The `routes` get registered with the `Router` using the `registerRouterInjector` utility function, along with the registry instance. Once routes get registered, you can then [mount](https://dojo.io/learn/creating-widgets/introduction#rendering-to-the-dom) the application with the registry.

We hope that the new dojo cli template application gives Dojo users a solid start with routing and an introduction to the registry, key components of building scalable applications.

Now, why is routing important in progressive web apps? Routing allows you to lazy load portions of your application until the users need them. For example, in the template application, some users may never click on the profile view, so why should the application unnecessarily load the files for that view.

![lazy loading](assets/blog/dojo-cli-template-app/lazy-loading.gif)

Here, you can see that the files for the views are not loaded until they get clicked. This is code splitting, something Dojo 1.x was fantastic at solving and that the new Dojo provides automatically by using the [`@dojo/cli-build-app`](https://dojo.io/learn/building/creating-bundles#creating-bundles) command.

Adapted from Rene Rubalcava's original post on [learn-dojo](https://learn-dojo.com/dojo-cli-template-app/).
