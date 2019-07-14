# Crafting Enterprise Web Applications

## Preamble - Application Lifecycle

In an era of agile delivery, small pieces of functionality are constantly shipped to users. The software industry began favouring this approach as it helps minimize risk and instead maximizes user engagement and satisfaction.

Even with modern delivery methodologies, some risk is still inevitable. Complexity is one such risk, and can become a major concern for mature applications. Regardless of which system architectures an application may follow, over time, many small pieces of functionality can build up into a large and daunting codebase that requires several teams to oversee.

The opportunities to implement new cleanly-designed features become rarer the longer an application is in production. Instead, existing features are more likely to be tweaked, bug-fixed or extended. Successful applications - and the features that comprise them - spend the majority of their lifecycle under maintenance.

Maintaining a complex application requires great discipline. It is far too easy for teams to get overwhelmed and spend their time clashing with codebase and colleagues instead of delivering value to users. Mitigating this risk involves many different approaches, covering areas of standards, patterns, technology choices and tooling, amongst others.

## Managing Complexity

Errors are best caught as early as possible in the software delivery lifecycle. It is far quicker and cheaper to fix an error that has just been introduced in a single development stream than it is once the error has progressed through the entire delivery pipeline and is live in production where users may be negatively impacted by it.

### Typing

A good way of catching errors early is favoring strong typing in the application development phase. Logical errors caused by mismatched data types can be avoided if type information is made explicit in application code. Compilers and static type checkers can validate against the type information and fail a build when such a type mismatch occurs. Software can only progress past an individual developer’s workspace to the rest of the delivery pipeline once all such errors are resolved.

Dojo builds upon [TypeScript] to provide explicit typing and static compile-time type checking. Applications built using Dojo can benefit from using TypeScript over vanilla JavaScript.

When using the [Dojo CLI] to scaffold applications, a TypeScript compilation phase is included by default in the application build process. Developers can simply start writing type-safe application code from the offset.

### Modularization

#### Single Responsibility Principle

A component should ideally be small enough for it to only implement a single responsibility. The simpler and more encapsulated a component is, the easier it becomes to understand and maintain between any number of developers over long periods of time. Complex applications with large codebases are built up through combinations of many such smaller, more well-understood components.

Isolating responsibilities within individual components has many benefits when trying to reduce complexity:

-   Scope is limited. Assuming a component maintains a consistent API, internal changes can be made without affecting external users of the component. Conversely, details of the component are kept internal to its definition module, meaning its definition will not conflict with that of other components that may overlap certain naming conventions.
-   Testing requirements are simplified, as unit tests only need to focus on a single responsibility rather than exponential combinations of application flows through multiple conditionals.
-   Components can be reused in multiple locations, avoiding repetition. Bug fixes need only be made to a single component instead of several independent instances.

For web applications, isolation comes with additional benefits to end users. Applications can be partitioned into multiple layers, allowing users to load only the layer they are interested in at a given point in time. This reduces resource size and associated network transfer requirements, resulting in shorter load times for users before they can become productive.

#### Components of a Dojo application

##### Index HTML file

HTML pages are the foundation of every web application and Dojo applications are no different. Traditionally a single `index.html` file serves the role of representing both the entry point to the application, as well as the root container for the application’s overall structure within the DOM.

Dojo applications are typically injected into a single DOM element, by default `document.body`. This allows a Dojo application to easily coexist with other content on a page - static assets, a legacy application or even another Dojo application.

##### Widgets

Widgets are Dojo's analogy to DOM elements, and are the central concept of encapsulation within a Dojo application. Just as traditional websites are built up through a hierarchy of DOM elements, a Dojo application is constructed through a hierarchy of widgets.

Widgets represent everything from individual UI elements - such as a label or a textbox - to more complex containers that may represent a form, a page, or an entire application.

Similarly as not all elements within a DOM are visible to users, Dojo widgets are not exclusively focused on providing a user interface, but can also serve any behind-the-scenes requirements to implement the full range of application functionality.

See the [Creating Widgets] reference for information on how to create widgets within your application.

##### TypeScript Modules

Dojo widgets can be represented either as render function factories or TypeScript classes, and are typically contained within a single TypeScript module. The module encapsulates most of what constitutes the widget, including its behavior and semantic representation within a [virtualized DOM].

Widgets provide an API to external consumers via a [properties] interface. This interface serves as both a list of state fields that can be injected into the widget from others that compose it, as well as any functions that can be called if the widget needs to notify other parts of the application when an event occurs, such as a change in state.

##### CSS Modules

Presentational styling of widgets is handled via CSS, similar to styling of regular HTML elements. CSS modules are used to encapsulate the presentational concerns of a single widget and avoid clashing between other widgets that may use similar CSS class names.

Widgets can import their CSS modules as per any other TypeScript import, allowing them to refer to their CSS class names via object properties which can be autocompleted within a developer’s IDE. These property names can be used to specify styling classes when declaring the widget’s semantic element structure. CSS class name mismatches between a widget and its styling can therefore be identified at build time.

While a widget can entirely encapsulate its own styling via its corresponding CSS module, usually some flexibility is required. A widget may be used in different configurations across an application, each with their own unique presentational needs. Dojo supports the ability to override specific styles to meet these needs.

To support consistent presentation across an application, widget styling can be further controlled via [theming](#theming).

See the [Styling and Theming] reference for more details on how to style individual widgets.

### State Management

Enterprise applications typically require their state to be persisted over time, and allow users to view and manipulate this data in a variety of ways. State management can become one of the most complex areas of a large application when given the need to access and edit the same data, concurrently, across multiple locations while maintaining consistency.

State is usually persisted in a data store or database that is external to the web application components, meaning some state management complexity needs to be solved outside of the application. However for instances where data is flowing between the application and its users, several paradigms can help minimize the risks of complex state management.

#### Reactive Data Modification

Applications written in an imperative manner describe what data should be changed, how the change should occur, as well as specifying when and where the changes must occur. If several pieces of data are logically connected via some form of computation or assignment, their connection is only represented at a discrete point in time. Outside of this point in time, any of the data values may be changed in a way that violates their intended logical connection.

Applications written in a reactive manner instead try to elevate the logical connections between data, and relinquish control of specifying exactly when and where changes are made in favor of having the logical data connections kept consistent over time.

Complex applications with multiple service layers may have even more representations of the same data point as it flows around various locations in the application - a common pattern for this is the use of data transfer objects. Maintaining integrity of application state becomes exponentially complex the more representations a given piece of data may have.

Any application with a UI that presents dynamic state - including web applications - will encounter the problem of maintaining logical data connection consistency. A piece of data in these applications will always have at least two representations.

##### Example Problem Illustration

Given a todo list application that stores a set of tasks, a single task will have the following two data representations when shown to a user:

-   The task’s current description (its “source of truth”, such as what its value is in a data store)
-   A copy of the task’s description that is presented to a user via a UI element, such as a label or textbox.

If users can only view tasks, there are several issues related to how changes to a task’s description can be made visible to the users.

If a task is changed in the underlying data store, its new description needs to be propagated up through the UI so users aren’t viewing stale data. If the task is displayed in more than one location in the UI, all instances need to be updated so that users aren’t viewing inconsistent data between locations.

If users can also modify tasks (such as changing their description), there are additional issues that need solving.

A task description now has two sources of truth: the old value in the datastore, and the new value that a user has entered in a textbox UI element.

A change request then needs to be propagated back down to the underlying data store so the old value can be replaced with the new. Once the change is made, the new task description needs to be sent back up to the user so they see the correct value that includes their change. Any errors that may occur when trying to change the task description also need to be factored into this data exchange.

#### State Management in Dojo

For the most [basic state management] requirements, a widget can manage its own state via locally-scoped variables. While this approach favours isolation and encapsulation, it is only appropriate for very simple use cases such as widgets that appear in a single location within an application, or are disconnected from all other state an application deals with.

As the need to share state between widgets increases, Dojo favours Reactive Inversion of Control. State can be lifted up into parent container widgets and injected into contained child widgets via the child’s [properties interface]. This lifting of state can traverse the entire widget hierarchy if needed, where state is centralized within the root application widget and portions of it are then injected into relevant child branches.

For more complex requirements, or for large widget hierarchies where passing state between unrelated intermediate layers is not desireable, an externalized data store may prove the best approach. A central data store can help applications that deal with substantial amounts of state, allow complex state edit operations, or require the same subsets of state in many locations.

Dojo provides a [Stores] component which supports a variety of advanced state management requirements, such as:

-   Inherent support for asynchronous commands, such as making calls to remote services for data management.
-   Deterministic sequencing of state manipulation operations.
-   State operation recording, allowing operation rollbacks/undo
-   Middleware wrapping of data manipulation processes, for cross-cutting concerns such as authorization or logging.
-   Built-in support for a localStorage-based data store, aiding PWAs.
-   Support for optimistic data updates, with automatic rollback on failure

## User Experience

Web applications inherently provide their experiences through a user interface, and application authors need to consider a wide variety of factors to best present this interface to their users. Consistent visual presentation and accessibility are typically the most obvious but there are also concerns around efficiency and performance, both within the application logic and delivery of its assets, that all contribute to how users experience a web application.

### Theming

One way applications provide optimal user experiences is via a consistent presentation to end users. This may be as simple as using a consistent font family across similar elements, but often extends to presenting the application in a corporate color palette, or even implementing an entire design language such as Material Design.

Dojo’s styling pipeline makes use of CSS modules to encapsulate style rules to specific widgets and avoid cross-contamination across large codebases. Styles are not entirely isolated however - centralized CSS variables can define common theme attributes and be shared between all application widgets. Custom theming can also be provided for Dojo’s widget suite.

See the [Styling and Theming] reference section for information on how to create application themes.

### User Interface Widgets

Dojo provides several off-the-shelf user interface components through its [widget suite]. Developers can make immediate use widgets that address many common user interface patterns such as comboboxes, buttons, lists, tabs, text input and calendar entry widgets amongst others.

Dojo's widgets natively support [internationalization, accessibility](#accessibility-a11y-and-internationalization-i18n) and [theming](#theming), giving developers flexibility in delivering user experiences that are unique to their application without needing to invest in custom element creation.

### Navigational Routing

While some applications provide users a primary view in which to conduct the majority of their work, many applications contain more areas that a user can access. Help pages, settings panels or multi-step workflows are examples of where an application may have several different interfaces that a user could access at any given time.

Sections of an application need to be uniquely identifiable in order for a user to access them. These identifiers are also required to support bookmarking & sharing of links to a particular section of an application. Users also need a way to navigate between sections in order to access all functionality an application may provide. Navigation could simply be going forward to the next step of a process, backwards to a previous step, or ad-hoc jumping between several options depending on what a user chooses.

Traditional websites that use static files naturally have separately-identifiable sections, in that each static file within the site can be individually accessed. HTML files can use anchor elements to allow users to navigate between files by clicking on links, rather than having to manually change the URI in their browser’s address bar.

Single-page web applications, as their name suggests, only contain a primary file through which a user accesses the entire application. These applications can however make use of URIs (together with all their inherent benefits) to identify each subsection.

A router component provides navigation options across a hierarchy of routes, and handles dispatching to relevant application subsections that correspond to identifiable routes. A router will also handle any error conditions, such as navigation to non-existent routes.

#### Routing in Dojo

Dojo's routing system allows applications to register URL subpaths as routes that link to a specific type of widget, called an Outlet. When a user navigates to a particular route, the outlet widget registered against the route will be rendered.

While outlets are ‘rendered’ when users navigate to them, they seldom deal directly with the rendering of application functionality. Outlets are primarily wrappers that handle navigational concerns - passing of query parameters, or handling error fallbacks - and instead delegate to other widgets within an application for functional rendering.

Applications can provide navigation options to users via Link widgets which are associated to Outlets, in a similar manner to using anchors in traditional HTML pages.

When using routing, Dojo’s build system can [automatically generate separate bundles](#automated-layering) for each top level route within the application. Each bundle can then be independently delivered to users as they are needed.

See the [Routing] reference section for details on how to implement routing within your application.

### Efficiency and Performance

#### Performant Rendering

Dynamic website content - including JavaScript - has been a part of the web for many years. Websites have long been able to include scripts that manipulate the DOM to add, update or remove content. The origin of the web, however - and what remains one of its key features today - is a foundation on static content. Browsers’ DOM implementations have been optimized over time to render static document content as efficiently and quickly as possible to end users.

As more complex web applications have appeared in recent years, browsers have answered with DOM performance optimizations that favor more dynamic content. However, in order to render their user interfaces, web applications still need to interact with an imperative API that has remained mostly unchanged for decades. Modern web applications designed around reactive data propagation need a more efficient way of translating their user interfaces into a webpage’s DOM.

Dojo abstracts the DOM away from applications and promotes the use of reactive state flows to minimize application boilerplate while also allowing for increased rendering performance. Widgets output virtual nodes from their render functions which represent the widgets' structural representation within a [virtualized DOM]. The framework then handles the process of [rendering] changes to the VDOM across renders in the most efficient way possible, only affecting concrete DOM elements that actually require changing.

Dojo provides another DOM abstraction layer through its [middleware] system for applications that need concrete information from the DOM to implement their requirements. Dojo middleware solves a variety of these concerns in a consistent manner while still supporting reactive data flows across an application.

#### Application Delivery: Layering and Bundling

As web applications grow in size, it becomes inefficient for users to load all application resources when only a subset may be required for a given task. Every application resource has a cost associated with its size: memory storage requirements, data transfer over the network; all impacting the time a user needs to wait for before they can begin their work. It is in the users’ best interests that this cost be kept to a minimum by having applications only load what is needed, when it is needed.

Fetching an application resource incurs additional overhead around HTTP resource negotiation. Data needs to be requested by the client, after which the client has to wait before the server finishes sending the last byte of the resource. In more severe cases, the overhead can also include DNS resolution, full TCP connection re-establishment and TLS cipher/certificate negotiation.

Browsers are efficient in minimizing this overhead, but they cannot eliminate it entirely - a web application still has its own part in the responsibility of minimizing resource transfer overhead. The overhead associated with fetching application resources is relatively static when compared to the size of a given resource. Fetching a 1 KB file incurs similar overhead to fetching a 100 KB file.

Overhead can therefore be minimized in two ways: by decreasing the total number of resources, and by increasing the size of a single resource. Web applications can achieve both by layering and bundling related resources.

A single layer should contain the set of resources related to particular functionality within an application. When a user accesses the functionality, all resources in the layer are likely to be loaded around the same time. Everything comprising a single layer can then be bundled together into a single file for more efficient delivery to the user.

##### Automated Layering

When using Dojo’s [routing system](#navigational-routing), applications can benefit from automatic layering and bundling. An application’s top-level routes each become a separate layer, and Dojo’s build system will automatically generate bundles for each subsection. This gives layer separation and resource bundling without needing any additional tool chain configuration. There is a tradeoff with this automation in that common dependencies shared across multiple layers are inlined and duplicated within each bundle.

##### Declarative Layering

Complex applications may require more fine-grained control over their layer/bundle definitions. For example, if an application has a set of shared dependencies that are used across multiple routes - rather than inlining/duplicating the dependencies within each route’s bundle, it may be desirable to extract the shared dependencies to their own bundle which can be lazily-loaded on first reference.

Dojo’s build pipeline allows for designating resource [bundles] within an application’s `.dojorc` build configuration file, and can automatically convert module dependencies that cross bundle boundaries into lazily-loaded references.

### Accessibility (a11y) and Internationalization (i18n)

The web is inherently global in nature, and applications written for it need to support all its users. Text needs to be presented in a user's chosen language and script, and values such as dates, times, numbers and currency need to be formatted accordingly given the user's locale setting.

Dojo allows for easy use of message bundles to separate text messages from application logic, and can optionally make use of relevant portions of [Unicode CLDR] data to support more advanced value formatting where required.

Developing for the web requires applications that are inclusive of users regardless of their accessibility needs. W3C's [accessibility initiative](https://www.w3.org/WAI/) has helped standardize many such requirements, including extra consideration for [Accessible Rich Internet Applications](https://www.w3.org/WAI/standards-guidelines/aria/).

Developing applications using Dojo's [widget suite] provides [WAI-ARIA] attributes out-of-the-box. While Dojo helps in this regard, it can only do so much - application authors have extra responsibility to validate the level of accessibility that their application provides. It is recommended that an explicit accessibility testing step be included in the application's delivery lifecycle.

See the [Internationalization] reference for more information on how to develop Dojo applications for a global audience.

### Adaptable Presentation

With the importance of the internet in modern society, web applications have required to adapt to a proliferation of ways that users access the web. Smaller form-factor mobile experiences have eclipsed desktop usage but larger presentation formats remain valid to deliver complex application requirements. Dojo provides a variety of solutions to help developers create applications that adapt to their users' access needs.

When pre-rendered content is needed (such as when developing static sites), Dojo applications can make use of build-time rendering ([BTR]) where some or all of the application structure is computed at build time rather than at runtime within a user's browser. Dojo provides a flexible block-based [BTR] solution to support this. that also allows for progressive hydration to support dynamic behavior on top of pre-rendered content. Developers can make use of BTR in this way to optimize the initial set of content and application assets that are delivered to users when they initially access an application.

Progressive web applications ([PWAs]) can help deliver experiences that are closer to native device apps, while still benefiting from the portability benefits that that web helps support. Dojo helps with the creation of [PWAs] through simple build configuration that enables developers to add features such as offline usage, background data syncing and push notifications to their applications.

Dojo allows developers to make use of several upcoming web APIs in a consistent manner across all delivery targets through its [middleware] system. The [intersection observer] API can be used to more efficiently control rendering of only the portions of an application that are visible to a user, such as supporting endless scroll lists. The [resize observer] API can enable applications to dynamically respond to changes in viewport size, allowing for interfaces to adapt gradually between the full range of resolutions across desktop and mobile viewports.

## Application Development Lifecycle

Dojo provides an end-to-end pipeline for developing web applications. Application authors can quickly create new Dojo applications via the [`dojo create app`] CLI command. Applications can then be built in both development and production modes using the [`dojo build app`] command. The build tool allows for rapid development and validation iteration through serving a local HTTP server and watching for further changes to project files. Using this mechanism, developers can make changes and see immediate results in a fully running application.

These commands form part of a modular [Dojo CLI] toolchain that support a variety of uses across the development lifecycle. Applications can configure their build pipeline through a `.dojorc` configuration file in the project root.

See the [Build] reference section for more information on how to build a variety of applications using Dojo.

### Testing Strategies

Not all errors can be caught through compilers or static type checkers. Features can be written that are syntactically and logically valid, but either don’t anticipate problems at runtime, or do not perform functionality in the intended way. To mitigate this risk, additional testing needs to be performed.

When using the [Dojo CLI] to scaffold applications, a test runner for the [Intern] test library is included by default. This allows developers to begin writing test code immediately alongside application functionality.

Intern provides solutions for many testing concerns but may not be sufficient for all testing needs of a project. Dojo also provides a simple testing harness that allows application test code to validate use of the framework and widgets at the VDOM abstraction level. This harness can be used from any test runner such as Intern, Jest, or any others that an application’s testing strategy necessitates.

See the [Testing] reference for more details on how to effectively test Dojo applications.

[TypeScript]: https://www.typescriptlang.org/
[Dojo CLI]: https://github.com/dojo/cli/blob/master/README.md
[Creating Widgets]: https://github.com/dojo/framework/blob/master/docs/en/creating-widgets/supplemental.md#introduction-to-widgets
[virtualized DOM]: https://github.com/dojo/framework/blob/master/docs/en/creating-widgets/supplemental.md#working-with-the-vdom
[rendering]: https://github.com/dojo/framework/blob/master/docs/en/creating-widgets/supplemental.md#rendering-to-the-dom
[properties]: https://github.com/dojo/framework/blob/master/docs/en/creating-widgets/#node-properties
[styling and theming]: https://github.com/dojo/framework/blob/master/docs/en/styling-and-theming/introduction.md
[basic state management]: https://github.com/dojo/framework/blob/master/docs/en/creating-widgets/supplemental.md#basic-self-encapsulated-widget-state
[properties interface]: https://github.com/dojo/framework/blob/master/docs/en/creating-widgets/supplemental.md#intermediate-passing-widget-properties
[Stores]: https://github.com/dojo/framework/blob/master/docs/en/stores/introduction.md
[Middleware]: https://github.com/dojo/framework/blob/master/docs/en/middleware/introduction.md
[Intern]: https://theintern.io/
[Routing]: https://github.com/dojo/framework/blob/master/docs/en/routing/introduction.md
[WAI-ARIA]: https://www.w3.org/TR/wai-aria/
[Internationalization]: https://github.com/dojo/framework/blob/master/docs/en/i18n/introduction.md
[Testing]: https://github.com/dojo/framework/blob/master/docs/en/testing/introduction.md
[Build]: https://github.com/dojo/framework/blob/master/docs/en/building/introduction.md
[bundles]: https://github.com/dojo/framework/blob/master/docs/en/building/supplemental.md#creating-bundles
[`dojo create app`]: https://github.com/dojo/cli-create-app/blob/master/README.md
[`dojo build app`]: https://github.com/dojo/cli-build-app/blob/master/README.md
[Unicode CLDR]: http://cldr.unicode.org/
[widget suite]: https://github.com/dojo/widgets/blob/master/README.md
[PWAs]: https://github.com/dojo/framework/blob/master/docs/en/building/supplemental.md#progressive-web-apps
[BTR]: https://github.com/dojo/framework/blob/master/docs/en/building/supplemental.md#build-time-rendering
[intersection observer]: https://github.com/dojo/framework/blob/master/docs/en/middleware/supplemental.md#intersection
[resize observer]: https://github.com/dojo/framework/blob/master/docs/en/middleware/supplemental.md#resize