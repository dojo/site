The Dojo framework 5.0.0 release.

### Breaking Changes

* [Consolidate all has modules into single `has` module](https://github.com/dojo/framework/pull/182)
* [Enable extra classes to be applied to child widgets](https://github.com/dojo/framework/issues/163)
* [Remove unused `has` flag and remove support for `async` flags](https://github.com/dojo/framework/pull/194)
* [Improved store middleware, supporting `before` and `after` actions](https://github.com/dojo/framework/pull/173)

### Enhancements

* [Enhance working with base paths using `StateHistory`](https://github.com/dojo/framework/pull/159)
* [Allow top level registry items in the VDOM renderer](https://github.com/dojo/framework/pull/139)
* [Include external polyfills in dojo/shim](https://github.com/dojo/framework/pull/184). (https://github.com/dojo/framework/issues/183, https://github.com/dojo/framework/pull/194, https://github.com/dojo/framework/pull/225)
* [Optimize building cache decorator](https://github.com/dojo/framework/pull/202)
* [`Block` meta](https://github.com/dojo/framework/pull/203). (https://github.com/dojo/framework/issues/206, https://github.com/dojo/framework/pull/224)
* [Infer `display` style for custom elements from widget root node](https://github.com/dojo/framework/issues/209)
* [Assertion Templates](https://github.com/dojo/framework/pull/218)
* [TypeScript 3.2.x support](https://github.com/dojo/framework/pull/217)

### Bug Fixes

* [Support opening router generated links in a new window](https://github.com/dojo/framework/issues/147)
* [Correctly format router generated links](https://github.com/dojo/framework/issues/146)
* [Synchronous initial routing navigation](https://github.com/dojo/framework/issues/145)
* [Support undefined and null values for `activeClasses` in `ActiveLink`](https://github.com/dojo/framework/issues/149)
* [Remove extra DOM nodes during an initial merged render](https://github.com/dojo/framework/pull/158)
* [Support setting a value on a select DOM node](https://github.com/dojo/framework/issues/153). (https://github.com/dojo/framework/pull/170)
* [Conditional elements rendering out of order with only two siblings](https://github.com/dojo/framework/issues/172)
* [Fix class typings for `exitAnimation` and `enterAnimation` ](https://github.com/dojo/framework/pull/181)
* [Incorrect ordering of nodes at the same depth](https://github.com/dojo/framework/issues/200)
* [Add default export for `watch` decorator](https://github.com/dojo/framework/pull/204)
* [Always render `StoreProvider` when parent renders](https://github.com/dojo/framework/issues/188)
* [Deal with extra nodes inserted into an existing HTML structure on initial merge](https://github.com/dojo/framework/issues/228)
