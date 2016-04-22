System.register(['angular2/core', './httpService', './authService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, httpService_1, authService_1;
    var SERVICE_PROVIDER;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpService_1_1) {
                httpService_1 = httpService_1_1;
            },
            function (authService_1_1) {
                authService_1 = authService_1_1;
            }],
        execute: function() {
            exports_1("SERVICE_PROVIDER", SERVICE_PROVIDER = [
                core_1.provide(httpService_1.httpService, { useClass: httpService_1.httpService }),
                core_1.provide(authService_1.authService, { useClass: authService_1.authService }),
            ]);
        }
    }
});
