---
title: Custom Dojo Middleware
date: 2020-02-03
author: Anthony Gubler & Rene Rubalcava
---

Dojo provides a [middleware system](https://dojo.io/learn/middleware/introduction) that you can use in developing widgets for your applications. There is a comprehensive list of [available middleware](https://dojo.io/learn/middleware/available-middleware) that you can use to manage local widget state, styling, or DOM related information.

Middleware is really interesting because they can be used to help you interact with the DOM or with the properties of your widget.

You can create middleware the same way you would a widget, except instead of returning a vnode, you could return an object or function that can be used to do some extra work for your widget.

The Dojo documentation touches on [creating your own middleware](https://dojo.io/learn/middleware/middleware-fundamentals#creating-middleware). How could you implement your own custom middleware for your own widgets?

## Validation Middleware

Maybe I'm building some form based widgets and I want to provide my own validation. For example, I might want to validate that a phone number is entered correctly.

In this case, I'm interested in wrapping an input in some form of validation. So I'm going to create a `PhoneValidator` widget to wrap DOM `input`. The result would look something like this.

```tsx
// src/widgets/PhoneNumber.tsx
import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";

import PhoneValidator from "./PhoneValidator";

import * as css from "./styles/PhoneNumber.m.css";

const factory = create({ icache });

export const PhoneNumber = factory(function PhoneNumber({
  middleware: { icache }
}) {
  // use local phone value to pass to validator
  const phone = icache.getOrSet("phone", "");
  return (
    <PhoneValidator phone={phone}>
      <input
        placeholder="Enter phone number"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
        classes={[css.root]}
        type="tel"
        onkeyup={e => {
          icache.set("phone", (e.target as HTMLInputElement).value);
        }}
      />
    </PhoneValidator>
  );
});

export default PhoneNumber;
```

The idea here is that we want the `PhoneValidator` to place a red or green outline to my input to let me know if it's a valid phone number or not. It's pretty simple, but is something I could reuse across multiple applications.

> src/widgets/PhoneValidator.tsx

```tsx
import { create, tsx } from "@dojo/framework/core/vdom";
import phoneNumberMiddleware from "../middleware/phoneNumberMiddleware";

import * as css from "./styles/PhoneValidator.m.css";

interface Properties {
  phone: string;
}

const factory = create({ phoneNumberMiddleware }).properties<Properties>();

export const PhoneValidator = factory(function PhoneValidator({
  children,
  middleware: { phoneNumberMiddleware }
}) {
  const { valid, value } = phoneNumberMiddleware();
  let validCss = "";
  if (value.length) {
    validCss = valid ? css.valid : css.invalid;
  }
  return <div classes={[css.root, validCss]}>{children()}</div>;
});

export default PhoneValidator;
```

The `PhoneValidator` uses some middleware that returns the a `valid` property that is either `true` or `false`. It will also return the `value` of the phone number that was tested. Based on whether the phone number is valid or not, it will use some CSS for a red or green border.

Notice that I never pass the `phone` property to the middleware. By provide the `phoneNumberMiddleware` as a middleware to the `PhoneValidator` widget, the middleware will have access to the properties of the widget. Let's see what that looks like.

```tsx
// src/middleware/phoneNumberMiddleware.tsx
import { create } from "@dojo/framework/core/vdom";

const factory = create().properties<{ phone?: string }>();

export const phoneNumberMiddleware = factory(({ properties }) => {
  return () => {
    // extract the `phone` value from the properties of
    // the parent widget
    const { phone } = properties();
    // test the phone number
    const valid = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone || "");
    return {
      valid,
      value: phone
    };
  };
});

export default phoneNumberMiddleware;
```

The middleware returns a function that will test the phone number and return whether it is valid or not.

Here is what this looks like in a sample application.

!(https://codesandbox.io/embed/dojo-custom-middleware-w1f7m?fontsize=14&module=%2Fsrc%2Fmiddleware%2FphoneNumberMiddleware.ts)

## Geolocation Middleware

You could also do some fun middleware that interacts with the DOM of you widgets. For example, there is the [`intersection`](https://dojo.io/learn/middleware/available-middleware#intersection) and [`resize`](https://dojo.io/learn/middleware/available-middleware#resize) middleware.

You could use a similar pattern to grab the browsers geolocation.

```ts
// src/middleware/geolocation.ts
import { create } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";

const factory = create({ icache });

type Coords = Pick<Coordinates, "latitude" | "longitude">;

// utility to get current geolocation
const getGeolocation = async (): Promise<Coords> => {
  return new Promise(resolve => {
    if (!("geolocation" in navigator)) {
      resolve({ latitude: 0, longitude: 0 });
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        resolve({ latitude, longitude });
      });
    }
  });
};

// default coordinates
const defaultCoordinates = { latitude: 0, longitude: 0 };

export const geolocation = factory(({ middleware: { icache } }) => {
  return (): Coords => {
    // get current value or default
    const coords = icache.getOrSet("coords", defaultCoordinates);
    if (coords.latitude === 0 && coords.longitude === 0) {
      // only get location if it is not the default
      getGeolocation().then(results => {
        if (
          coords.latitude !== results.latitude &&
          coords.longitude !== results.longitude
        ) {
          // only update cache if different from current value
          // this will invalidate the widget
          icache.set("coords", results);
        }
      });
    }
    return coords;
  };
});

export default geolocation;
```

This middleware uses the [`icache`](https://dojo.io/learn/middleware/available-middleware#icache) middleware so that when the geolocation properties are updated, it will invalidate the middleware and this will in turn invalidate the widget so it can rerender with new data.

```tsx
// src/main.tsx
import { renderer, create, tsx } from "@dojo/framework/core/vdom";
import "@dojo/themes/dojo/index.css";

import Hello from "./widgets/Hello";

import geolocation from "./middleware/geolocation";

const factory = create({ geolocation });

const App = factory(function App({ middleware: { geolocation } }) {
  // get my geolocation middleware values
  const { latitude, longitude } = geolocation();
  return (
    <div key="container">
      <Hello name="Dojo CodeSandbox" />
      <h2>{"Start editing to see some magic happen \u2728"}</h2>
      <section>
        <ul>
          <li>Latitude: {latitude.toFixed(3)}</li>
          <li>Longitude: {longitude.toFixed(3)}</li>
        </ul>
      </section>
    </div>
  );
});
```

Here is a demo of what this looks like. You may need to open it in a new window to get your location.

!(https://codesandbox.io/embed/dojo-geolocation-middleware-msmvc?fontsize=14&module=%2Fsrc%2Fmiddleware%2Fgeolocation.ts)

## Summary

There are numerous ways you could build middleware for your applications. Device orientation, mouse interactivity, media queries, hardware devices, drag and drop, full screen, authentication, and so much more. I'm looking forward to all the different ways middleware can be implemented into Dojo widgets!

Adapted from Rene Rubalcava's original post on [learn-dojo](https://learn-dojo.com/dojo-custom-middleware/).