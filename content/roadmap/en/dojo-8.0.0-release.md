---
title: Dojo 8
date: July 2021
released: true
---

The Dojo framework 8.0.0 release.

### Breaking Changes

* Resources Middleware Caching and Api Updates (#877, #882, #884, #885)

### Enhancements

* Support for TypeScript 4.1 (#892)
* Support for custom resource APIs (#878)
* Create resource templates based on the Data and Api type of a widget (#889, #891)
* Support nested transforms when resources are passed down through multiple widgets (#880)
* Support special head tag for rendering node in the document head (#805)
* Wildcard routing (#766)
* Support redirect in routing configuration (#867, #868, #869, #900)
* Refines the create template function APIs (#866)
* Add intrinsic element types (#796, #814)
* Re-use DOM nodes when moving widgets and nodes in a list (#799)
* Allow numbers in vdom (#781)
* Support optional query params in routing configuration (#901)
* Add `onUpdate` and `onDetach` APIs for dom pragma (#829)
* Lazy load custom elements on demand (#825)
* Adds support for event proxying and event options (#856)
* Add map shim to Outlet (#860)
* `pending` API to expose the state of asynchronous icache setters (#862, #865)
* Custom element resource support (#815)
* Start to decouple dom completely from vdom (#883)
* Add block middleware mock (#798)
* Allow finding and modifying wrapped widgets in functional children (#780, #851)
* Use the middleware key as the middleware id in the test renderer (#859)
* Support testing widgets with nested typed children (#898)

### Bug Fixes

* Expand types for insert after/before (#802)
* Only run the inert middleware when the properties have been changed (#888)
* Add function to create "typed" version of middleware (#819)
* Rendering for multiple nested `head` and `body` nodes (#812)
* Cache the function wrapper, no need to recreate each render. (#903)
* Ensure that resources are correctly initialised even if the resource already has been previous created. (#861)
* Make inputs partially only controlled (#887)
* Take in to account virtual nodes when hydrating an existing DOM structure (#896)
* Always pass the target attribute to the anchor tag for `Link` regardless of whether the event is intercepted (#907)
* Register the messages for all locales (#908)
* Fix mock middleware types (#822)
* Handle ignored children in decorate (#840)
* Wrap children result in an array if not already in one (#844)
* Support setting properties on named children that are a render result for assertions (#854)
* Update `insertSiblings` type definition (#872)
* Pass inserted flag correctly to deferred props in test renderers (#881)
* Fix the typings for the arguments on the test renderer child api (#871)
