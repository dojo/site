---
title: Building apps with Dojo
date: 2021-06-15T12:00:00.000Z
author: Rene Rubalcava
---

Dojo provides a one-stop shop for building scalable and efficient web applications. Dojo includes all the basics you need:

* Widgets
* Routing
* State Management

![Building a Dojo App](assets/blog/building-dojo-app/featured.jpg)

<!-- more -->

Sometimes when building an app, you might need to mix and match different libraries to get all of these features, but when working with a full framework, this tooling is expected out of the box. Sometimes this is a tradeoff between flexibility versus versatility. I personally like having everything I need to get started in one place, with room to bring in extra tooling as needed.

Today, we're going to build a coffee shop app, where you can add a type of coffee and customize it for your order. These are some of the key items and features our application will need.

* Home Page
* Menu Page
* Drink Page to customize order
* Add to Cart
* Remove from Cart

Navigating between these pages will require the use of routing and we'll use Dojo state management to handle customizing drink orders.

## Start with state

Let's start by defining interfaces and types. This is why I'm such a huge fan of TypeScript, it let's me take a look at an application at a high level and think about it from a data perspective. Since this is a coffee shop application, we should probably have an interface for our coffee drink.

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

This let's us define the properties of a coffee drink and it also has options to define the size, flavors, toppings, and add-ins we want for our coffee drink. We also have a general state interface to provide an array of drinks.

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

import dojoTheme from '@dojo/widgets/theme/dojo';
import Header from '@dojo/widgets/header';

import Outlet from '@dojo/framework/routing/Outlet';
import { Link } from '@dojo/framework/routing/Link';

import Home from './widgets/Home';

import * as css from './App.m.css';

const factory = create({ icache,theme });

export default factory(function App({ middleware: { icache, theme } }) {
	if (!theme.get()) {
		theme.set(dojoTheme);
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

The App page is basically our layout page. We're going to the [Header](https://widgets.dojo.io/#widget/header/overview) widget to give us a sticky header, which can be done by providing the `sticky` attribute. The header will contain a title and some actions. These actions are using the `<Link>` widget to route different pages. There's also an anchor tag used to open the shopping cart, which will open a [SlidePane](https://widgets.dojo.io/#widget/slide-pane/overview). We'll get to that later though.

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

## Widget Integration

We can create a `drinkStore` middleware to use with our processes in widgets.

```ts
// src/middleware/drinkStore.ts
import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { State } from '../interfaces';

export default createStoreMiddleware<State>();
```

We can add this to our application to define our menu of items.

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

The store middleware is used to get access to the drinks from our external source. The first time the widget renders, drinks will be `undefined` so we can use the `executor` of the store to execute our `fetchDrinks` process.

```ts
// use the store to get state
const { executor, get, path } = store;
const drinks = get(path('drinks'));

if (!drinks) {
    executor(fetchDrinks)({});
}
```

When the process executes, it will kick of another render of the widget when the `drinks` array is updated. The `drinks` are then passed to our `DrinkList`, via `<DrinkList drinks={drinks} />`. So let's take a look at that next.

## Keep a list

The `DrinkList` is going to represent our menu page. It will display an image, name, and price for the drinks our customers can choose from. This is accomplished with a list of `<DrinkCard>` widgets.

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

The `DrinkCard` widget is going to provide a nice preview for our stellar coffee drinks!

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

The `DrinkCard` utilizes some widgets from `@dojo/widgets`. We're going to use the `Card` to wrap the widget. We'll be using the `Avatar` to display a circular shaped image for us. We can then use the `Link` widget from `@dojo/framework/routing/Link` to create an Add button. This will let us route to a specific drink page to customize the drink and add it to our order.

The `DrinkList` is fairly straightforward as it just displays the list of `DrinkCard`.

```tsx
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

This also opens up avenues where we can apply filters to the drinks in the future. Maybe by price, or type of coffee. The filter could be applied in the process or directly in this `DrinkList` widget. Not something to be implemented at the moment, but it's nice to think about future scalability and what's possible.

## Building a Cart

Once a user navigates to a page to customize their drink, we need a way for a use to save their drink to a cart. We need a few things here.

* Initialize a cart
* Add drinks to cart
* Remove drinks from cart

### Initialize Cart

```ts
// src/processes/cart.ts
import {
	createProcess,
	createCommandFactory,
} from '@dojo/framework/stores/process';

import { Drink, Cart } from '../interfaces';

const commandFactory = createCommandFactory<Cart>();

// ---------------------
// Commands
// ---------------------

const initCartCommand = commandFactory(async ({ state }) => {
	state.drinks = [];
	state.total = 0;
});


// ---------------------
// Processes
// ---------------------

export const initCart = createProcess('init-cart', [initCartCommand]);
```

Here we set up a basic `initCartCommand` that initializes state with an empty array of `drinks` and a `total` price of zero. The `total` is just the total cost of the `drinks` in the cart.

### Add to Cart

```ts
// src/processes/cart.ts

...

// generate ids for drink orders
const genId = () => Math.floor((1 + Math.random()) * 0x10000);

// ---------------------
// Commands
// ---------------------

...

const addToCartCommand = commandFactory<Drink>(async ({ state, payload }) => {
	const drink = { ...payload, id: genId() };
	state.drinks.push(drink);
	const prices = state.drinks.map((x) => x.price);
	state.total = prices.reduce((a, b) => a + b, 0);
});


// ---------------------
// Processes
// ---------------------

export const addToCart = createProcess('add-to-cart', [addToCartCommand]);
```

For the `addToCardCommand`, we take a `Drink` payload from a widget and we're going to assign a random number as the `id`. We do that with `Math.floor((1 + Math.random()) * 0x10000)`. This is just a poor mans way of generating a larger random number. In a production environment, hopefully you would be using a backend and database to manage this for you. As you can see we add the payload to the `drinks` array and calculate the total price of drinks in the cart.

```ts
const prices = state.drinks.map((x) => x.price);
state.total = prices.reduce((a, b) => a + b, 0);
```

### Remove from Cart

If we let the user add drinks to their cart, it's a good guess they might want to remove items from the cart.

```ts
// src/processes/cart.ts

...

// ---------------------
// Commands
// ---------------------

...

const removeFromCartCommand = commandFactory<Drink>(
	async ({ state, payload }) => {
		const drinks = state.drinks.filter((x) => x.id !== payload.id);
		const prices = drinks.map((x) => x.price);
		state.total = prices.reduce((a, b) => a + b, 0);
		state.drinks = drinks;
	}
);

// ---------------------
// Processes
// ---------------------

...

export const removeFromCart = createProcess('remove-from-cart', [
	removeFromCartCommand,
]);
```

To remove an item from the cart, we can filter out the drink to remove it from the `drinks` array.

```ts
const drinks = state.drinks.filter((x) => x.id !== payload.id);
```

Once we filter out the drink to remove, we can recalculate the total price of all the drinks in the cart and update the state object.

In general, we kept the `cart` process pretty simple. The idea is you would make any external requests in the process, parse the results, and maybe transform the data a little bit to be easier to work with in your widgets.

## Customize and Add to Cart

The `DrinkPage` widget that is used to customize the drink and add it to cart is probably the most involved widget in this application. But only because it will manage its own internal state via `icache` and have some multiple choice selections. The `DrinkPage` also has some features we want to build.

* Display Drink properties
* Adjust price based on Drink size
* Add Drink to cart
* Navigate back to menu when done

```tsx
// src/widgets/DrinkPage.tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import { icache } from '@dojo/framework/core/middleware/icache';
import { injector } from '@dojo/framework/core/middleware/injector';

import Button from '@dojo/widgets/button';
import Card from '@dojo/widgets/card';
import CheckboxGroup from '@dojo/widgets/checkbox-group';
import Label from '@dojo/widgets/label';
import RadioGroup from '@dojo/widgets/radio-group';

import store from '../middleware/cartStore';
import { addToCart } from '../processes/cart';

import { Drink } from '../interfaces';

import * as css from './styles/DrinkPage.m.css';
import Router from '@dojo/framework/routing/Router';

const factory = create({ icache, injector, store }).properties<Drink>();

export default factory(function DrinkPage({
	middleware: { icache, injector, store },
	properties,
}) {
	const router = injector.get<Router>('router');
	const drink = properties();
	const { name = 'Coffee', price, imageUrl: image } = drink;
	const currentPrice = icache.getOrSet('currentPrice', price);
	const add = store.executor(addToCart);

	return (
		<div classes={[css.root]}>
			<h3>{name}</h3>
			<Label secondary>${currentPrice.toFixed(2)}</Label>
			<img classes={[css.image]} src={image} />
			...
		</div>
	);
});
```

Before we dive in to the details of the UI here, let's look at some of the work that the `DrinkPage` widget is going to do. The price of the drink is going to vary based on the size of the drink selected.

We are going to extract the properties of the `Drink` to use in the widget and then set our `currentPrice`.

```ts
const drink = properties();
const { name = 'Coffee', price, imageUrl: image } = drink;
const currentPrice = icache.getOrSet('currentPrice', price);
```

We can also set up an `add` function with our store middleware and process to add the Drink to the cart.

```ts
const add = store.executor(addToCart);
```

Because we are going to want to navigate back to our `DrinkList` menu, we need to be able to access the `Router` from Dojo. There are a couple of ways you can do this, but we are going to use the [`injector` middleware](https://dojo.io/learn/middleware/available-middleware#injector).

```ts
const router = injector.get<Router>('router');
```

Remember, when we initialize the application, we used the `registerRouterInjector` to inject the `router` into the Dojo registry. The `injector` middleware is a great utility you can use to access the Dojo Registry to get access to the `Router` or `State` depending on what is available to you. Now that we have the `router` in our application, we can use it to programmitically route to other pages.

Now we can take a look at the customization options for our Drink.

```tsx
// src/widgets/DrinkPage.tsx

...

export default factory(function DrinkPage({
	middleware: { icache, injector, store },
	properties,
}) {
	...

	return (
		<div classes={[css.root]}>
			...
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<RadioGroup
								name="size"
								initialValue="small"
								options={[
									{ value: 'small', label: 'Small' },
									{
										value: 'medium',
										label: 'Medium (+ $0.50)',
									},
									{
										value: 'large',
										label: 'Large (+ $1.00)',
									},
								]}
								onValue={(value) => {
									icache.set('size', value);
									switch (value) {
										case 'small':
											icache.set('currentPrice', price);
											break;
										case 'medium':
											icache.set(
												'currentPrice',
												price + 0.5
											);
											break;
										case 'large':
											icache.set(
												'currentPrice',
												price + 1
											);
											break;
									}
								}}
							>
								{{
									label: 'Drink Size',
								}}
							</RadioGroup>
						</div>
					),
				}}
			</Card>
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<CheckboxGroup
								name="addins"
								options={[
									{
										value: 'milk',
										label: 'Milk',
									},
									{
										value: 'sugar',
										label: 'Sugar',
									},
									{
										value: 'stevia',
										label: 'Stevia',
									},
									{
										value: 'honey',
										label: 'Honey',
									},
								]}
								onValue={(values) => {
									icache.set('addins', values);
								}}
							>
								{{
									label: 'Add Ins',
								}}
							</CheckboxGroup>
						</div>
					),
				}}
			</Card>
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<CheckboxGroup
								name="flavors"
								options={[
									{
										value: 'caramel',
										label: 'Caramel',
									},
									{
										value: 'vanilla',
										label: 'Vanilla',
									},
									{
										value: 'pumpkin',
										label: 'Pumpkin',
									},
									{
										value: 'almond',
										label: 'Almond',
									},
								]}
								onValue={(values) => {
									icache.set('flavors', values);
								}}
							>
								{{
									label: 'Flavors',
								}}
							</CheckboxGroup>
						</div>
					),
				}}
			</Card>
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<CheckboxGroup
								name="toppings"
								options={[
									{
										value: 'cinnamon',
										label: 'Cinnamon',
									},
									{
										value: 'whipped cream',
										label: 'Whipped Cream',
									},
									{
										value: 'nuts',
										label: 'Nuts',
									},
								]}
								onValue={(values) => {
									icache.set('toppings', values);
								}}
							>
								{{
									label: 'Toppings',
								}}
							</CheckboxGroup>
						</div>
					),
				}}
			</Card>
			...
		</div>
	);
});
```

This looks like there is more happening here than there really is. We basically have a number of `Card` widgets that wrap a `CheckboxGroup`, which provides a list of options as checkboxes. When you click on a checkbox, the `onValue` method is kicked off and it provides an array of checked `values`. We can use these `values` to update our internal state with `icache`.

```ts
// per CheckboxGroup
icache.set('addins', values);
icache.set('flavors', values);
icache.set('toppings', values);
```

The one that varies a bit, is the option to choose the size of the Drink. This is because the Drink size will update the Drink price.

```tsx
// src/widgets/DrinkPage.tsx

...

export default factory(function DrinkPage({
	middleware: { icache, injector, store },
	properties,
}) {
	...

	return (
		<div classes={[css.root]}>
			...
			<Card>
				{{
					content: (
						<div classes={[css.content]}>
							<RadioGroup
								name="size"
								initialValue="small"
								options={[
									{ value: 'small', label: 'Small' },
									{
										value: 'medium',
										label: 'Medium (+ $0.50)',
									},
									{
										value: 'large',
										label: 'Large (+ $1.00)',
									},
								]}
								onValue={(value) => {
									icache.set('size', value);
									switch (value) {
										case 'small':
											icache.set('currentPrice', price);
											break;
										case 'medium':
											icache.set(
												'currentPrice',
												price + 0.5
											);
											break;
										case 'large':
											icache.set(
												'currentPrice',
												price + 1
											);
											break;
									}
								}}
							>
								{{
									label: 'Drink Size',
								}}
							</RadioGroup>
						</div>
					),
				}}
			</Card>
			...
		</div>
	);
});
```

In this case, we use a `RadioGroup` so there is only one option that can be selected at a time. That option will be used to calculate the Drink price.

```ts
icache.set('size', value);
switch (value) {
	case 'small':
		icache.set('currentPrice', price);
		break;
	case 'medium':
		icache.set(
			'currentPrice',
			price + 0.5
		);
		break;
	case 'large':
		icache.set(
			'currentPrice',
			price + 1
		);
		break;
}
```

Finally, once the user is done customizing their Drink, they need a way to add that drink to the Cart.

```tsx
// src/widgets/DrinkPage.tsx

...

export default factory(function DrinkPage({
	middleware: { icache, injector, store },
	properties,
}) {
	...

	return (
		<div classes={[css.root]}>
			...
			<Button
				onClick={() => {
					const size = icache.getOrSet('size', 'small');
					const addins = icache.getOrSet('addins', []);
					const toppings = icache.getOrSet('toppings', []);
					const flavors = icache.getOrSet('flavors', []);
					const currentPrice = icache.getOrSet('currentPrice', price);

					const userDrink: Drink = {
						...drink,
						price: currentPrice,
						size,
						addins,
						toppings,
						flavors,
					};
					add(userDrink);
					if (router) {
						router.setPath('menu');
					}
				}}
			>
				Add to Cart
			</Button>
		</div>
	);
});
```

Here, we have a `Button` that when clicked is going to create an updated `Drink` object based on the current selections, add that drink to the Cart, and the navigate to the `menu` route.

```ts
add(userDrink);
if (router) {
	router.setPath('menu');
}
```

## Show me the Cart

The `Cart` widget is a basic list of the Drinks that are in the Cart. It provides a look at the total price for all the drinks and a way to remove drinks from the Cart.

```tsx
// src/widgets/Cart.tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import store from '../middleware/cartStore';
import { initCart, removeFromCart } from '../processes/cart';

import * as css from './styles/Cart.m.css';

const factory = create({ store });

export default factory(function Cart({ middleware: { store } }) {
	const { executor, get, path } = store;
	const init = executor(initCart);
	const remove = executor(removeFromCart);
	const orders = get(path('drinks'));
	const total = get(path('total')) || 0;
	if (!orders) {
		init({});
	}

	return (
		<div classes={[css.root]}>
			{!orders || !orders.length ? (
				<div>Cart is empty</div>
			) : (
				<div key="drink-orders" classes={[css.content]}>
					{orders.map((x) => (
						<div classes={[css.order]} key={`order-${x.id}`}>
							<div classes={[css.item]}>
								<label>{x.name}</label>
								<label>Size: {x.size}</label>
								<button
									classes={[css.remove]}
									onclick={() => {
										remove(x);
									}}
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<label>Total: ${total.toFixed(2)}</label>
		</div>
	);
});
```

It's not too fancy, but it's only job is to display the Drinks in the Cart and let the user remove Drinks from the Cart. In this application, the Cart is not its own page, it will be displayed in a `SlidePane` so that it's visible on any page the user is on.

We can look at the `App.tsx` again and see how to use the `SlidePane`.

```tsx
// src/App.tsx

...

import SlidePane from '@dojo/widgets/slide-pane';

...

export default factory(function App({ middleware: { icache, store, theme } }) {
	...

	return (
		<div classes={[css.root]}>
			...
			<SlidePane
				title="Cart"
				open={icache.getOrSet('open', false)}
				underlay={false}
				align="right"
				onRequestClose={() => {
					icache.set('open', false);
				}}
			>
				<Cart />
			</SlidePane>
		</div>
	);
});
```

The `SlidePane` widget is pretty cool. You can place it at various places on the page and toggle the `open` property to `true` or `false`. No need to overcomplicate it here.


## Build it

Now we approach one of the most complicated tasks in web development and that is building a production deployment that is performant, uses service workers, and only loads the JavaScript as needed.

_... but wait._

Dojo does a great job of simplifying this process. For more details, you can read the [building](https://dojo.io/learn/building/introduction) section of the Dojo documentation. One of the most powerful features of Dojo build tooling is [build-time rendering](https://dojo.io/learn/building/buildtime-rendering).

You can configure this in your `.dojorc`.

```json
{
  "build-app": {
    "build-time-render": {
      "root": "root",
      "renderer": "jsdom"
    }
  }
}
```

You give the BTR the id of the `root` element in your application, and the rendering engine it should use to build the pages. As you can see, they tried to make it complicated, but just couldn't do it.

_But I need a progressive web app..._

Ok, ok. You don't need to do too much, that can be configured in the `.dojorc` as well.

```json
{
  "extends": "./.dojorc",
  "build-app": {
    "build-time-render": {
      "root": "root",
      "renderer": "jsdom"
    },
    "pwa": {
      "manifest": {
        "name": "The Brew House",
        "short_name": "Brew House",
        "description": "Where Coffee Brews",
        "background_color": "#ffffff",
        "theme_color": "#00704A",
        "icons": [
          {
            "src": "assets/coffee.png",
            "sizes": [
              128,
              256,
              512
            ]
          }
        ]
      },
      "serviceWorker": {
        "clientsClaim": true,
        "routes": [
          {
            "urlPattern": ".*",
            "strategy": "networkFirst",
            "expiration": {
              "maxEntries": 25
            }
          }
        ]
      }
    }
  }
}
```

You can find more details on [configuring for progressive web apps](https://dojo.io/learn/building/progressive-web-applications) in the documentation.

Now, we can build our app, deploy our app, and rake in all those coffee dollars!

## Summary

Building apps with Dojo is a great experience. As I mentioned at the beginning of this post, there are a handful of things that are usually needed for an application.

* Widgets or Components
* Routing
* State Management

Dojo provides a flexible suite of widgets in `@dojo/widgets` that we can pluck from when looking for some specific functionality. It saves significant time from writing custom widgets that can instead be spent on other features. Creating widgets is also very intuitive. We have local state management with `icache` to manage the basics.

Routing with Dojo is really simple too. We can use hash routing or normal routing depending on our preference. The point here is _it just works_.

State management might be the more involved portion of any application. Dojo lets us create small and focused commands to handle one task at a time. Then we can glue them together as a process and execute them as needed in our widgets!
