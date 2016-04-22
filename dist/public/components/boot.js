/// <reference path="../../../node_modules/angular2/typings/browser.d.ts"/>
System.register(["angular2/platform/browser", "angular2/http", "./services/bootstrapServices", './app/app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, bootstrapServices_1, app_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (bootstrapServices_1_1) {
                bootstrapServices_1 = bootstrapServices_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_1.AppComponent, [
                http_1.HTTP_PROVIDERS,
                bootstrapServices_1.SERVICE_PROVIDER
            ]);
        }
    }
});
