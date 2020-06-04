---
title: Data Aware Widgets in Dojo
date: 2020-06-05T12:00:00.000Z
author: Rene Rubalcava
---

The latest [Dojo release](blog/version-7-dojo) introduced a new way that you can integrate data into your widgets. This goes beyond simply managing your application state, but being able to create reusable Resource templates that can be used by multiple widgets in the same application. These templates could could all interact with the data differently, one could show a list, another could show charts, and so on.

![The image for the blog](assets/blog/title-of-blog/featured.png)

<!-- more -->

Dojo Resources allow you to build widgets that are _data aware_. Unlike some robot uprising self-awareness, this one is pretty harmless, but very cool. Whereas Dojo Stores are meant to be the source of data at the application level, Dojo Resources allow you to narrow the focus to individual widgets. Since we are focusing on making these widgets data aware, we can of course do this the Dojo way, through a middleware. What is really interesting about Resources, is that it's not only a state management tool, but also a data fetch tool, so all your data management needs are handled in a single tool.

For this demo, we're going to look at creating a very simple Hacker News feed.

## Resource Templates

Resources templates describe the various actions of a resource. There are three actions that a resource can have.

* `read`: How the resource will fetch data. This can be a web service API, or local storage, or some other in-memory data source.
* `find`: Similar to the `read` action, but you would use it to find a specific item from the resource.
* `init`: Provides a way to initialize the resource with some data.

When building this Hacker News feed, there are only a few properties I am interested in for the UI.

```ts
export interface HackerNewsItem {
  title: string;
  url: string;
  author: string;
  objectID: string;
  search: string;
}
```

Let's create a simple template that will read the Hacker News feed.

```ts
// template.ts
import {
  createResourceTemplate,
  defaultFind
} from "@dojo/framework/core/middleware/resources";

...

// Define a template on how to use the resource
export default createResourceTemplate<HackerNewsItem>({
  // Templates require a `find` method. You can use the provided `defaultFind`
  // if you don't provide one
  find: defaultFind,
  // The `read` method gets the request with the payload,
  // and ResourceControls to interact with the store
  read: async (request, { put }) => {
    const {
      size,
      offset,
      query: { search }
    } = request;
    const page = Math.floor(offset / size) + 1;
    const response = await fetch(`${API_ENDPOINT}${search}&page=${page}`);
    const result = await response.json();
    put({ data: result.hits, total: result.nbHits }, request);
  }
});
```

Ok, let's talk a little bit about what is happening in the Resource.

The `request` is going to provide the payload from the widget. It's going to provide a `size` and `offset` that make it easier to do pagination of your data. This is really useful for viewing large datasets in a reasonable manner. It's also going to provide the `query`, which is on object that is going to contain any query parameters you are going to use to fetch data.

In this case we are using a RESTful API for the Hacker News feed, but this could easily be configured for use with GraphQL or in-memory data source.

## Data Aware Widget

Now the fun part! We can create a data aware widget, that can use this Resource. I'll go over the details of this widget, but let's take a look at the whole thing to start.

```tsx
// HackerNewsList.tsx
import { create, tsx } from "@dojo/framework/core/vdom";
import { createResourceMiddleware } from "@dojo/framework/core/middleware/resources";
import { createICacheMiddleware } from "@dojo/framework/core/middleware/icache";

import HackerNewItem from "./HackerNewItem";
import hnTemplate from "../hnTemplate";

interface ListState {
  search: string;
  readItemIds: string[];
  page: number;
}

// Create a resource middleware without a item interface, which means
// no resource property will be added to the widgets property api
const resource = createResourceMiddleware();
const icache = createICacheMiddleware<ListState>();
const factory = create({ icache, resource });

const HackerNewList = factory(function HackerNewList({
  id,
  middleware: { icache, resource }
}) {
  // de-structure resource API controls
  const { createOptions, getOrRead, isFailed, isLoading } = resource;
  // create an set of options to work with, with the widget id
  const options = createOptions(id);
  // get the current search term
  const search = icache.getOrSet("search", "TypeScript");
  const page = icache.getOrSet("page", 1);
  // resource aware widgets let you know if they are loading or there was an error
  // results are return in arrays of pages (can request multiple pages)
  const [result] = getOrRead(
    hnTemplate,
    options({ size: 20, page, query: { search } })
  );
  const loading = isLoading(
    hnTemplate,
    options({ size: 20, page, query: { search } })
  );
  const failed = isFailed(
    hnTemplate,
    options({ size: 20, page, query: { search } })
  );
  const readItemIds = icache.getOrSet("readItemIds", []);

  if (failed) {
    // if a resource read fails show an error message
    return <span>Something went wrong</span>;
  }

  return (
    <section>
      <h1>My Hacker Stories</h1>
      <div>
        <strong>Search:</strong>
        <input
          type="text"
          focus={true}
          value={search}
          oninput={({ target }) => {
            // Dojo 7, icache can now be set without invalidation
            icache.set("search", (target as HTMLInputElement).value, false);
          }}
          onkeydown={event => {
            if (event.key === "Enter") {
              icache.set("search", (current = "") => current);
              event.preventDefault();
            }
          }}
        />
        <button
          onclick={() => {
            // Dojo 7, icache can take a function that injects the current state value
            icache.set("search", (current = "") => current);
          }}
        >
          Submit
        </button>
      </div>
      <div>
        <button
          disabled={options().page === 1}
          onclick={() => {
            icache.set("page", (current = 1) => current - 1);
          }}
        >
          prev
        </button>
        <button
          onclick={() => {
            icache.set("page", (current = 1) => current + 1);
          }}
        >
          next
        </button>
      </div>
      {loading && <h1>...loading</h1>}
      {!loading &&
        result
          .filter(item => readItemIds.indexOf(item.objectID) === -1)
          .map(item => (
            <HackerNewItem
              key={item.objectID}
              item={item}
              remove={old => {
                icache.set("readItemIds", (current = []) => [...current, old]);
              }}
            />
          ))}
    </section>
  );
});

export default HackerNewList;
```

Ok, there's a lot going on here, so let's break it down.

First thing we do is import the modules to create the widget and use some middleware.

```ts
import { create, tsx } from "@dojo/framework/core/vdom";
import { createResourceMiddleware } from "@dojo/framework/core/middleware/resources";
import { createICacheMiddleware } from "@dojo/framework/core/middleware/icache";

import HackerNewItem from "./HackerNewItem";
import hnTemplate from "../hnTemplate";

interface ListState {
  search: string;
  readItemIds: string[];
  page: number;
}
```

The `createResourceMiddleware` let's you create a typed resource interface to work with resource templates.
The `createICacheMiddleware` allows you to create a typed `icache` middleware. It's more type friendly than simply using `icache` in your widgets. Developer ergonomics people. Someone may have to work on this widget six months down the road and _better types, no tears to wipe_.

We also import a simple widget to display each news item and our template. `ListState` is the interface for our widgets local state. Makes it easier to track what page we are on and which news items we're filtering out.

Now we can create the middleware and our widget factory method.

```tsx
const resource = createResourceMiddleware();
const icache = createICacheMiddleware<ListState>();
const factory = create({ icache, resource });
```

This pretty straight forward, the factory method will let us create widgets with local state and a resource API. Now we can move on to the widget, which will cover in sections.

```tsx
const HackerNewList = factory(function HackerNewList({
  id,
  middleware: { icache, resource }
}) {
  // de-structure resource API controls
  const { createOptions, getOrRead, isFailed, isLoading } = resource;
  // create an set of options to work with, with the widget id
  const options = createOptions(id);
  // get the current search term
  const search = icache.getOrSet("search", "TypeScript");
  const page = icache.getOrSet("page", 1);
  const currentOptions = options({ size: 20, page, query: { search } });
  // resource aware widgets let you know if they are loading or there was an error
  // results are return in arrays of pages (can request multiple pages)
  const [result] = getOrRead(hnTemplate, currentOptions);
  const loading = isLoading(hnTemplate, currentOptions);
  const failed = isFailed(hnTemplate, currentOptions);
  const readItemIds = icache.getOrSet("readItemIds", []);
  ...
});
```

The `resource` middleware provides an API to interact with the resource template.

* `createOptions`: This is used to create a payload specific to your widget via `createOptions(id)`, where `id` is the id of the widget. This is useful, because you can have multiple widgets using the same resource in your application, so internally, Dojo will manage that.
* `getOrRead`: You can use this method to request data from the resource, using the template and the options you provide it. Under the hood, this function is going to be asynchronous, so there are some utility APIs you can use to determine the resource state.
* `isLoading`: Given the template and options, it will let you know if the resource if still fetching data.
* `isFailed`: Given the template and options, will return `true` or `false` if the resource action failed. It's in the name.

The rest of this code is getting the current search query, current page, and news item ids that are being filtered out.

Let's dig in to some widget rendering logic.

```tsx
const HackerNewList = factory(function HackerNewList({
  id,
  middleware: { icache, resource }
}) {
  ...

  if (failed) {
    // if a resource read fails show an error message
    return <span>Something went wrong</span>;
  }

  return (
    <section>
      <h1>My Hacker Stories</h1>
      <div>
        <strong>Search:</strong>
        <input
          type="text"
          focus={true}
          value={search}
          oninput={({ target }) => {
            // Dojo 7, icache can now be set without invalidation
            icache.set("search", (target as HTMLInputElement).value, false);
          }}
          onkeydown={event => {
            if (event.key === "Enter") {
              icache.set("search", (current = "") => current);
              event.preventDefault();
            }
          }}
        />
        <button
          onclick={() => {
            // Dojo 7, icache can take a function that injects the current state value
            icache.set("search", (current = "") => current);
          }}
        >
          Submit
        </button>
      </div>
      <div>
        <button
          disabled={options().page === 1}
          onclick={() => {
            icache.set("page", (current = 1) => current - 1);
          }}
        >
          prev
        </button>
        <button
          onclick={() => {
            icache.set("page", (current = 1) => current + 1);
          }}
        >
          next
        </button>
      </div>
      {loading && <h1>...loading</h1>}
      {!loading &&
        result
          .filter(item => readItemIds.indexOf(item.objectID) === -1)
          .map(item => (
            <HackerNewItem
              key={item.objectID}
              item={item}
              remove={old => {
                icache.set("readItemIds", (current = []) => [...current, old]);
              }}
            />
          ))}
    </section>
  );
});
```

The first thing we do is check to see if the resource has failed for some reason. The widget doesn't care _why_ it failed, that should be handled by the resource. It should only care that something went wrong, so we show a message for that. This is just convenient and a simple way to handle errors in the widget.

```tsx
if (failed) {
  // if a resource read fails show an error message
  return <span>Something went wrong</span>;
}
```

Once we've verified that are resource hasn't thrown an error and all is right in our resource world, we can start to look at the meat of our widget.

```tsx
<input
  type="text"
  focus={true}
  value={search}
  oninput={({ target }) => {
    // Dojo 7, icache can now be set without invalidation
    icache.set("search", (target as HTMLInputElement).value, false);
  }}
  onkeydown={event => {
    if (event.key === "Enter") {
      icache.set("search", (current = "") => current);
      event.preventDefault();
    }
  }}
/>
<button
  onclick={() => {
    // Dojo 7, icache can take a function that injects the current state value
    icache.set("search", (current = "") => current);
  }}
>
  Submit
</button>
```

The first thing we do is update our local state for the widget. For the `oninput` event, we don't want our `icache` update to fire a render, because that will happen when you press the Enter key or the submit button. `icache` now accepts an optional third boolean argument to update with invalidating local state and preventing the widget from rendering itself.

```ts
// This will not force a rerender
icache.set("search", (target as HTMLInputElement).value, false);
```

During the `onkeydown` event, we're going to check if the user pressed the Enter key, then we'll kick off all the update goodness of the widget and resource middleware to use the update `search` of the local state to fetch some new results and update our display.

```ts
icache.set("search", (current = "") => current);
```

Instead of passing a value to set the local state, you can pass a function that will inject the current state. In this case, we're not doing anything too useful, but you'll see how this comes into play for pagination.

The next section is going to allow us to paginate through our RESTful API.

```tsx
<button
  disabled={options().page === 1}
  onclick={() => {
    icache.set("page", (current = 1) => current - 1);
  }}
>
  prev
</button>
<button
  onclick={() => {
    icache.set("page", (current = 1) => current + 1);
  }}
>
  next
</button>
```

The widget tracks the current page of our results in local state. So in order to update the page we are on, we are going to increment or decrement the page. Using the `icache` with a function to inject local state, this becomes pretty straightforward.

```ts
icache.set("page", (current = 1) => current - 1);
icache.set("page", (current = 1) => current + 1);
```

Modifying local state becomes super simple now that we have access to the current state right in the `icache.set()` method. You don't need to do this outside the `icache` and then update it. This is a small touch, but I think it's one that makes development a delight.

Finally, we are going to iterate over the results of our resource and display them.

```tsx
{loading && <h1>...loading</h1>}
{!loading &&
  result
    .filter(item => readItemIds.indexOf(item.objectID) === -1)
    .map(item => (
      <HackerNewItem
        key={item.objectID}
        item={item}
        remove={old => {
          icache.set("readItemIds", (current = []) => [...current, old]);
        }}
      />
    ))}
```

First we check if the resource is `loading`, and display a loading message. If the resource is done loading, we now iterate the results and pass them to a simple widget that just displays the news feed item. You might notice that we first filter the results based on a list of `readItemIds`. This is updated by a function passed to the `HackerNewsItem` widget that will mark a story as _read_, and not display it in our feed.

```ts
icache.set("readItemIds", (current = []) => [...current, old]);
```

You can see this full application [in this CodeSandbox](https://codesandbox.io/embed/dojo-hacker-stories-jfhwu).

## Summary

Dojo 7 has some pretty significant updates from previous releases. The introduction of Resources and how to use use them in data aware widgets is probably one of my favorite. I could have an entire suite of widgets that can interact with the same resource template and maybe interact and display results differently. I could distribute them as a widget library or web components and start dropping them as needed. I could drop this news feed widget into a sidebar on a blog that shows results related to the topic of the current blog post!

Big thanks to [Anthony Gubler](https://twitter.com/agubler_) who helped me navigate the updates to this feature during the Dojo 7 development lifecycle as I was working with the beta and RC releases!

It also may seem like a small thing, but I really appreciate it, is the ability inject the current state when updating local state like this.

```ts
icache.set("page", (current = 1) => current - 1);
icache.set("page", (current = 1) => current + 1);
```

That just makes me smile.

Check out the [dojo docs](https://dojo.io/) and try out Dojo 7, I think you'll be very pleased!

