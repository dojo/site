---
title: Dojo CLI Template App
date: 2020-01-01
author: Anthony Gubler
---

![Dojo CLI](assets/blog/dojo-cli-template-app/featured.svg)

<!-- more -->

It is easy to get started with Dojo using the Dojo CLI and create app command to scaffold a brand new project using the dojo template application. Firstly install both `@dojo/cli` and `@dojo/cli-create-app` globally.

```shell
npm install @dojo/cli @dojo/cli-create-app -g
```

The `@dojo/cli-create-app` command provides a number of options to tweak the template application. By default the template application uses the programmatic API (however for this blog we'll be using `--tsx` to create a template that uses TSX) and provides theming and routing out of the box so you can quickly get up and running with some features that you will probably end up using at some point in a larger application.

To create the template application run the dojo cli create app command providing the application name

```shell
dojo create app --name my-first-dojo-app --tsx
```

If you don't want to install the dependencies globally, you can also use [`npx`](https://www.npmjs.com/package/npx) to create your first dojo application.

```shell
npx -p @dojo/cli-create-app -p @dojo/cli -- dojo create --name my-first-dojo-app --tsx
```

Now let's take a look at the structure you get with the new template app.

![create app structure](assets/blog/dojo-cli-template-app/create-app-stucture.svg)

More details can be about routing can be found in the [Dojo documentation](https://dojo.io/learn/routing/introduction). The key here is that each view for a route is defined by an Outlet. An `Outlet` is just a wrapper for widgets that will be displayed in that routes view.

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

Ok, so let's break this down a little bit. The application is using TSX which and you can see that in this case, what is happening is there is a top level `Menu`, with a `div` underneath. In this `div` is where each Outlet is defined, with an `id`, `key` (optional), and what to display in the **render** method.

We won't go in to detail on each view. They are fairly standard widgets, but let's take a look at the routing part. The routes are defined in a simple object.

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

Each route has a path, with the name of the outlet id, which coincides with the id of the outlet defined in the previous snippet. Super simple and straight forward. You can also see that the home route is defined as the **defaultRoute**.

Here is how the whole thing is put together.

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

The `routes` are registered with the `Router` using the `registerRouterInjector` utility function, along with the a registry instance. Once your routes are registered, you can then [mount](https://dojo.io/learn/creating-widgets/introduction#rendering-to-the-dom) the application with the registry.

We hope that the new dojo cli template app gives users a solid start with routing and an introduction to the registry, which in our opinion are key components of building scalable applications.

Now, why is routing important in progressive web apps? It allows you to lazy load parts of your application until you need them. For example, in the template application some users may never click on the profile page, so why should your application load the files for that page unnecessarily . You can see what we mean in this animated image.

<!-- add the animated gif -->

Here, you can see that the files for the pages are not loaded until they are clicked on. This is code splitting, something Dojo 1 was fantastic at and that the new Dojo provides by using the [`@dojo/cli-build-app`](https://dojo.io/learn/building/creating-bundles#creating-bundles) command.

Adapted from Rene Rubalcava's original post on [learn-dojo](https://learn-dojo.com/dojo-cli-template-app/).
