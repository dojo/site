---
title: Dojo 7
date: May 2020
released: true
---

The Dojo framework 7.0.0 release.

### Breaking Changes

* Remove the `Projector` mixin ([#549](https://github.com/framework/pull/549))
* Deprecate `cache` with optional flag on `icache` to skip validation ([#618](https://github.com/framework/pull/618))
* Decouple `Outlet` concept from referencing unique routes ([#716](https://github.com/framework/pull/716))
* New Dojo test renderer ([#710](https://github.com/framework/pull/710))

### Enhancements

* Typed children support for function-based widgets ([#544](https://github.com/framework/pull/544), [#554](https://github.com/framework/pull/554), [#561](https://github.com/framework/pull/561), [#582](https://github.com/framework/pull/582))
* Add `isExact` options to `ActiveLink` ([#520](https://github.com/framework/pull/520))
* Live binding to function-based widget properties and children ([#564](https://github.com/framework/pull/564), [#665](https://github.com/framework/pull/665))
* Check attached `node` is in the body ([#579](https://github.com/framework/pull/579))
* Provide helper middleware `api` type ([#580](https://github.com/framework/pull/580))
* Enable cache eviction with the `icache` ([#605](https://github.com/framework/pull/605))
* Inert shim ([#619](https://github.com/framework/pull/619))
* Support multiple CSS transition classes ([#628](https://github.com/framework/pull/628))
* Inert middleware ([#623](https://github.com/framework/pull/623))
* `focus` middleware testing mock ([#635](https://github.com/framework/pull/635))
* `validity` middleware testing mock ([#631](https://github.com/framework/pull/631))
* Type nls keys from the `i18n` format function ([#610](https://github.com/framework/pull/610))
* Support passing `null` to the `domNode` on `.mount(` ([#652](https://github.com/framework/pull/652))
* Influence property values with `diffProperties` middleware ([#653](https://github.com/framework/pull/653))
* Support specifying an additional property to be considered part of the widget key ([#661](https://github.com/framework/pull/661))
* Support automatic and lazy loading of CLDR data in i18n ([#657](https://github.com/framework/pull/657), [#677](https://github.com/framework/pull/677), [#686](https://github.com/framework/pull/686), [#693](https://github.com/framework/pull/693), [#694](https://github.com/framework/pull/694), [#724](https://github.com/framework/pull/724))
* Unmount an application ([#680](https://github.com/framework/pull/680))
* `data` middleware and `resources` ([#672](https://github.com/framework/pull/672), [#701]())
* Support setting and changing theme variants at runtime ([#684](https://github.com/framework/pull/684), [#711](https://github.com/framework/pull/711), [#720](https://github.com/framework/pull/720))
* "slot" support for Dojo custom elements ([#714](https://github.com/framework/pull/714), [#721](https://github.com/framework/pull/721))
* Forwards compatibility for TypeScript 3.8 ([#719](https://github.com/framework/pull/719))
* Configure document title on route change ([#725](https://github.com/framework/pull/725))
* Skip setting the route when working with build time rendering and using the development server ([#729](https://github.com/framework/pull/729))
* On-demand Build Time Rendering ([#246](https://github.com/dojo/webpack-contrib/pull/246))
* Set document title for build time rendered pages ([#260](https://github.com/dojo/webpack-contrib/pull/260))
* `.dojorc` schema validation for `@dojo/cli-build-app` ([#324](https://github.com/dojo/cli-build-app/pull/324))
* asdasdasda ([#729](https://github.com/framework/pull/729))

### Bug Fixes

* Run key checks synchronously ([#547](https://github.com/framework/pull/547))
* Ensure initial properties flag is set `false` ([#539](https://github.com/framework/pull/539))
* Call `diffProperties` immediately when first registered ([#572](https://github.com/framework/pull/572))
* Fix setting state in `focus` middleware ([#575](https://github.com/framework/pull/575))
* Do not invalidate when check if a widget should focus ([#583](https://github.com/framework/pull/583))
* Make assertion templates immutable ([#587](https://github.com/framework/pull/587))
* Ensure mixin properties are inferred correctly when using TSX ([#594](https://github.com/framework/pull/594))
* Run comparators when using harness.expect with an actual render output ([#602](https://github.com/framework/pull/602))
* Allow unsupported nodes to be ignore from harness's assertRender ([#599](https://github.com/framework/pull/599))
* Fix inserting nodes when using the `body` tag ([#640](https://github.com/framework/pull/640))
* Fix out of order rendering bug ([#642](https://github.com/framework/pull/642))
* Return injected `theme` as the widget's `theme` property ([#659](https://github.com/framework/pull/659))
* Support a mixture of arrays and single children for TSX ([#671](https://github.com/framework/pull/671))
* Update diff type for `Themed` mixin to be `auto` ([#685](https://github.com/framework/pull/685))
* Invalidate for the `icache.delete` and `icache.clear` API ([#695](https://github.com/framework/pull/695))
* `ActiveLink` support for matching query params ([#699](https://github.com/framework/pull/699))
* Widgets can render twice during a single scheduled render ([#712](https://github.com/framework/pull/712))
* Spread widget properties for function-based widget in vdom ([#717](https://github.com/framework/pull/717))
