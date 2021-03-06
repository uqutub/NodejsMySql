System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var httpService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            httpService = (function () {
                //contructor
                function httpService(http) {
                    this.http = http;
                }
                httpService.prototype.getJSON = function (url, cb) {
                    this.http.request(url)
                        .subscribe(function (res) {
                        cb(res.json()); //callBack
                    }); //http.request - for get
                }; //getJSON
                httpService.prototype.addJSON = function (url, obj, cb) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions();
                    options.headers = headers;
                    this.http.post(url, JSON.stringify(obj), options)
                        .subscribe(function (res) {
                        cb(res.json()); //callBack
                    }); //http.post
                }; //addJSON
                httpService.prototype.updateJSON = function (url, obj, cb) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions();
                    options.headers = headers;
                    this.http.put(url, JSON.stringify(obj), options)
                        .subscribe(function (res) {
                        cb(res.json()); //callback
                    });
                }; //updateJSON
                httpService.prototype.deleteJSON = function (url, cb) {
                    this.http.delete(url)
                        .subscribe(function (res) {
                        cb(res.json()); //callBack
                    });
                }; //deleteJSON
                httpService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], httpService);
                return httpService;
            }());
            exports_1("httpService", httpService); //HttpService
        }
    }
});
