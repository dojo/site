---
title: Building apps with Dojo
date: 2020-11-30T12:00:00.000Z
author: Rene Rubalcava
---

Dojo provides a one stop shop for building scalable and efficient web applications. It comes with all the basics you need:

* Widgets
* Routing
* State Management

Sometimes when building an app, you might have to choose between a mix and match of different libraries to use these features, but when working with a full framework, this is the type of tooling you would expect to get out of the box.

Today, we're going to build a coffee app, where you can add a type of coffee and customize it for your order. These are some of the key items and features our application will need.

* Home Page
* Menu Page
* Drink Page to customize order
* Add to Cart
* Remove from Cart

Navigating between these pages will require the use of routing and we'll use Dojo state management to handle customizing drink orders.

## Start with state

I like to start writing my apps by defining interfaces and types. This is why I'm such a huge fan of TypeScript, it let's me take a look at an application at a high level and think about how it from a data perspective. Since this is a coffee shop application, we should probably have an interface for our coffee drink.

```ts
// src/interfaces.ts
export interface Drink {
	id: number;
	name: string;
	price: number;
	addins: AddIn[];
	toppings: Toppings[];
	flavors: Flavor[];
	size: Size;
	imageUrl: string;
}

export type AddIn = 'milk' | 'sugar' | 'stevia' | 'honey';
export type Size = 'small' | 'medium' | 'large';
export type Flavor = 'caramel' | 'vanilla' | 'pumpkin' | 'almond';
export type Toppings = 'cinnamon' | 'whipped cream' | 'nuts';

export interface State {
	drinks: Drink[];
}
```

This let's me define what a coffee drink and it also has options to define the size, flavors, toppings, and addins we want for our coffee drink. We also have a general state to provide an array of drinks.

## Route in the right direction

The next step is to define some routes for the application.

```ts
// src/routes.ts
export default [
	{
		id: 'home',
		path: '/',
		outlet: 'main',
		defaultRoute: true,
	},
	{
		id: 'menu',
		path: '/menu',
		outlet: 'main',
	},
	{
		id: 'drink',
		path: '/drink/{id}',
		outlet: 'main',
	}
];
```

We know we're going to have a home page, a menu page, and a page for customizing a drink to add to our order. Telling Dojo to use these routes can be done using the `registerRouterInjector` to inject your routes into the main registry of your application. The Registry can be thought of as the main container for your application.

```tsx
// src/main.tsx
import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import routes from './routes';
import App from './App';

const registry = new Registry();
registerRouterInjector(routes, registry);

const r = renderer(() => <App />);
const domNode = document.getElementById('root');
r.mount({ domNode, registry });
```

## Set up the App

For this application, we're going to take advantage of a variety of widgets from `@dojo/widgets`.

```tsx
// src/App.tsx
import { tsx, create } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import theme from '@dojo/framework/core/middleware/theme';

import dojo from '@dojo/widgets/theme/dojo';
import Header from '@dojo/widgets/header';

import Outlet from '@dojo/framework/routing/Outlet';
import { Link } from '@dojo/framework/routing/Link';

import Home from './widgets/Home';

import * as css from './App.m.css';

const factory = create({ icache,theme });

export default factory(function App({ middleware: { icache, theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	return (
		<div classes={[css.root]}>
			<Header sticky>
				{{
					title: 'The Brew Crew',
					actions: [
						<div classes={[css.items]}>
							<Link to="home">Home</Link>
						</div>,
						<div classes={[css.items]}>
							<Link to="menu">Menu</Link>
						</div>,
						<div classes={[css.items]}>
							<a
								href="#"
								onclick={(e) => {
									e.preventDefault();
									icache.set('open', (open) => !open);
								}}
							>
								Cart
							</a>
						</div>,
					],
				}}
			</Header>
			<Outlet id="main">
				{{
					home: <Home />
				}}
			</Outlet>
		</div>
	);
});
```

The App page is basically our layout page. We're going to the [Header](https://widgets.dojo.io/#widget/header/overview) widget to give us a sticky header, which can be done by providing the `sticky` attribute, so it's true. The header will contain a title and some actions. These actions are using the `<Link>` widget to route different pages. There's also an anchor tag used to open the shopping cart, which will open a [SlidePane](https://widgets.dojo.io/#widget/slide-pane/overview). We'll get to that later though.

For now we provide one simple route to `home`, which will display our `<Home>` page, that just shows an image of a coffee shop. In order to display the menu page, we'll need to pull in some data via a Dojo process.

## Trust the Process

For our purposes, we're going to pull the list of available drinks from a JSON file. This could just as easily come from a REST or GraphQL endpoint.

```json
// asserts/data.json
[
    {
        "id": 401,
        "name": "Cafe Latte",
        "price": 4.50,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    },
    {
        "id": 402,
        "name": "Mocha",
        "price": 5.50,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    },
    {
        "id": 403,
        "name": "Coffee",
        "price": 2.50,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    },
    {
        "id": 404,
        "name": "Espresso",
        "price": 2.50,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    },
    {
        "id": 405,
        "name": "Americano",
        "price": 3.50,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    },
    {
        "id": 406,
        "name": "Cappuccino",
        "price": 5.50,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
    }
]
```

This is a simple array of objects we can use to populate the menu page. We can now create a command and process for this.

```ts
// src/processes/drinks.ts
import {
	createProcess,
	createCommandFactory,
} from '@dojo/framework/stores/process';

import { Drink, State } from '../interfaces';

const commandFactory = createCommandFactory<State>();

type DrinkJSON = Pick<Drink, 'id' | 'name' | 'price' | 'imageUrl'>;

// ---------------------
// Commands
// ---------------------

// fetch list of drinks
const fetchDrinksCommand = commandFactory(async ({ state }) => {
	const response = await fetch('/assets/data.json');
	const data: DrinkJSON[] = await response.json();
	const drinks: Drink[] = data.map((x) => ({
		...x,
		addins: [],
		toppings: [],
		flavors: [],
		size: 'small',
	}));
	state.drinks = [...drinks];
});

// ---------------------
// Processes
// ---------------------

export const fetchDrinks = createProcess('fetch-drinks', [fetchDrinksCommand]);
```

Since the source JSON object only has info about the id, name, and price, when we initialize the array of drinks, we can provide some defaults for empty arrays of other properties and a default size.

We can create a `drinkStore` middleware to use with our processes in widgets.

```ts
// src/middleware/drinkStore.ts
import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { State } from '../interfaces';

export default createStoreMiddleware<State>();
```

Now we can add this to our application to define our menu of items.

```tsx
// src/App.tsx
...
import DrinkList from './widgets/DrinkList';
import Home from './widgets/Home';

import { fetchDrinks } from './processes/drinks';

const factory = create({ icache, store, theme });

export default factory(function App({ middleware: { icache, store, theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

    // use the store to get state
	const { executor, get, path } = store;
	const drinks = get(path('drinks'));

	if (!drinks) {
		executor(fetchDrinks)({});
	}

	return (
		<div classes={[css.root]}>
			<Header sticky>
				{{
					...
				}}
			</Header>
			<Outlet id="main">
				{{
					home: <Home />,
					menu: <DrinkList drinks={drinks} />
				}}
			</Outlet>
		</div>
	);
});
```

Now we use the store middleware to get access to the drinks from our external source. The first time the widget renders, drinks will be `undefined` so we can use the `executor` of the store to execute our `fetchDrinks` process.

```ts
// use the store to get state
const { executor, get, path } = store;
const drinks = get(path('drinks'));

if (!drinks) {
    executor(fetchDrinks)({});
}
```

When the process executes, it will kick of another render of the widget when the `drinks` array is updated. The `drinks` are then passed to our `DrinkList`, `<DrinkList drinks={drinks} />`. So let's take a look at that next.

## Keep a list

The `DrinkList` is going to represent our menu page. It will display an image, name, and price for the drinks our customers can choose from. But it's just a list of `<DrinkCard>` widgets.

```tsx
// src/widgets/DrinkList.tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import DrinkCard from './DrinkCard';

import { State } from '../interfaces';

import * as css from './styles/DrinkList.m.css';

const factory = create().properties<State>();

export default factory(function DrinkList({ properties }) {
	const { drinks = [] } = properties();
	const elems = drinks.map((drink) => <DrinkCard {...drink} />);

	return <div classes={[css.root]}>{elems}</div>;
});
```

There's not much happening here, except it delegates the drinks to `DrinkCard` widgets.

```tsx
// src/widgets/DrinkCard.tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import Avatar from '@dojo/widgets/avatar';
import Card from '@dojo/widgets/card';
import Label from '@dojo/widgets/label';
import Link from '@dojo/framework/routing/Link';

import { Drink } from '../interfaces';
import * as css from './styles/DrinkCard.m.css';

const factory = create().properties<Drink>();

export default factory(function DrinkCard({ properties }) {
	const { id, name = 'Coffee', price, imageUrl: image } = properties();

	return (
		<div classes={[css.root]}>
			<Card title={name}>
				{{
					content: (
						<div classes={[css.content]}>
							<Avatar
								variant="circle"
								size="large"
								src={image}
							></Avatar>
							<Label>${price.toFixed(2)}</Label>
						</div>
					),
					actionButtons: (
						<Link
							to="drink"
							params={{
								id: `${String(id)}`,
							}}
						>
							Add
						</Link>
					),
				}}
			</Card>
		</div>
	);
});
```

The `DrinkCard` utilizes some widgets from `@dojo/widgets`. We're going to use the `Card` to wrap the widget. We'll be using the `Avatar` to display the image in a circle for us. We can the use the `Link` widget from `@dojo/framework/routing/Link` to create an Add button. This will let us route to a specific drink page to customize the drink to add to our order.
