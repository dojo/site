---
title: Introduction to testing with Dojo
date: 2020-02-03
author: Anthony Gubler & Rene Rubalcava
---

![Dojo CLI](assets/blog/introduction-to-testing-with-dojo/featured.svg)

<!-- more -->

In addition to the standard features needed to build a multitude of applications, Dojo also comes with a complete testing module to help ensure that testing your application is as painless as possible. Having a well tested application is an important consideration when building a product that you need to ship to users. A well tested application will reduce negative impact on your users and increases confidence that adding new features won't introduce regressions. Good unit tests also help other engineers understand your codebase and intent when making changes in the future.

There are a number of different types of testing that help to ensure that an application has fewer bugs. Here we'll be concentrating on unit testing.

When creating a Dojo application using the Dojo [cli-create-app](https://dojo.io/blog/dojo-cli-template-app) command, the scaffolded project includes a set of unit tests to help guide unit testing your application.

![test structure](assets/blog/introduction-to-testing-with-dojo/test-structure.svg)

## Running Tests

The tests are run using the Dojo cli with the `@dojo/cli-test-intern` command that is preinstalled with the scaffolded application.

```bash
dojo test
```

You can also run the tests using the predefined scripts in the `package.json`.

```bash
npm test
```

So what do these tests look like?

> tests/unit/widgets/Profile.tsx

```tsx
const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import Profile from '../../../src/widgets/Profile';
import * as css from '../../../src/widgets/styles/Profile.m.css';

describe('Profile', () => {
	it('default renders correctly', () => {
		const h = harness(() => <Profile username="Dojo User" />);
		h.expect(() => <h1 classes={[css.root]}>Welcome Dojo User!</h1>);
	});
});
```

Dojo includes a [testing harness](https://dojo.io/learn/testing/dojo-test-harness) for testing your application's widgets. This harness enables you to shallowly assert that a widget's render output matches the expected output based on the widget's properties. Ideally, rendering a widget is going to be a _[pure function](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch03.md#chapter-03-pure-happiness-with-pure-functions)_, meaning they should be pretty easy to test when given the same input. 

## Assertion Templates

The `Profile` widget tested above has the `username` property that we can test against in the output. We could rewrite the entirety of the expected render output for each test (that's a lot of typing) or we could create an assertion to test against that would allow us to change the expected properties on each run. An important aspect of assertion templates is they ensure assertions are made for an entire unit, which in our case is always the entire render output. It can be tempting be to trigger an action and then only partially assert the section of the render output that the action is expected to affect. Partially asserting a widget's render output can be problematic as it means a test can "pass", but in fact the render output outside of the section asserted was affected and not caught, leading to uncaught bugs in a widget's structure. This means that we would not know if the action of triggering the event handler had any unexpected affects on other areas of a widget's render output.

To review how assertion templates get used, we need to update the `Profile` widget's property API to make the `username` optional.

> src/widgets/Profile.tsx

```tsx
import { tsx, create } from '@dojo/framework/core/vdom';

import * as css from './styles/Profile.m.css';

export interface ProfileProperties {
	username?: string;
}

const factory = create().properties<ProfileProperties>();

export default factory(function Profile({ properties }) {
	const { username = 'Stranger' } = properties();
	return <h1 classes={[css.root]}>{`Welcome ${username}!`}</h1>;
});
```

The `assertionTemplate` needs to get imported into our test module. Then we need to create a "base" assertion that represents the widget's default render output based on the properties API. For the `Profile` we have an `h1` node with the default `username`.

```tsx
const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import Profile from '../../../src/widgets/Profile';
import * as css from '../../../src/widgets/styles/Profile.m.css';

const baseAssertion = assertionTemplate(() =>
  <h1 classes={[css.root]} "assertion-key"="welcome">Welcome Stranger!</h1>
);

describe('Profile', () => {
	it('default renders correctly', () => {
		const h = harness(() => <Profile />);
		h.expect(baseAssertion);
	});
});
```

We can continue testing against our base assertion. In our assertion template, we add an `assertion-key` property to the node so that we can update the template for additional test scenarios.

The second test scenario of the `Profile` widget is to pass the `username` property, so we need to add a new assertion template. This could be created like the `baseAssertion` and for this example would not require much effort to create and maintain. However, as widgets grow in complexity, this would quickly become unmanageable. Instead the `assertionTemplate` [API](https://dojo.io/learn/testing/assertion-templates) can be used to factory an updated template.

> src/tests/unit/widgets/Profile.tsx

```tsx
const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import Profile from '../../../src/widgets/Profile';
import * as css from '../../../src/widgets/styles/Profile.m.css';

const baseAssertion = assertionTemplate(() =>
  <h1 classes={[css.root]} "assertion-key"="welcome">Welcome Stranger!</h1>
);

describe('Profile', () => {
	it('default renders correctly', () => {
		const h = harness(() => <Profile />);
		h.expect(baseAssertion);
	});

    it("renders given username correctly", () => {
    // update the expected result with a given username
    const namedAssertion = baseAssertion.setChildren("~welcome", [ "Welcome Kel Varnsen!" ]);
    const h = harness(() => <Profile username="Kel Varnsen"/>);
    h.expect(namedAssertion);
  });
});
```

The `assertion-key` is used with the `assertionTemplate` APIs to target the section of the template to change. As we provided a `username`, we should expect a different welcome message. The `assertionTemplate.setChildren()` API returns a new assertion template with the updated children to test against. The immutability of an `assertionTemplate` provides confidence that tests are isolated and will not affect any other tests in the suite.

You can read more about testing in Dojo, the harness, assertion templates and more in the [Dojo testing documentation](https://dojo.io/learn/testing).

## Summary

This was just a quick look at testing with Dojo, but we hope it highlights how useful the built-in tools are for testing Dojo widgets. Dojo tests use [Intern](https://theintern.io/) by default, so you can look at the docs on how to test the business logic of your applications as well. An added benefit here is that Intern provides [functional tests](https://theintern.io/docs.html#Intern/4/docs/docs%2Fwriting_tests.md/functional-tests), so you can test the behavior of your application as a user would interact with it. This topic requires an entire post of its own, but you can look at the [Dojo todo-mvc example](https://github.com/dojo/examples/tree/master/todo-mvc) to see how it uses functional tests. Happy testing!

Adapted from Rene Rubalcava's original post on [learn-dojo](https://learn-dojo.com/testing-with-dojo/).
