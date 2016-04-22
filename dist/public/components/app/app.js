/// <reference path="../../../../node_modules/angular2/typings/browser.d.ts"/>
System.register(['angular2/core', '../services/authService'], function(exports_1, context_1) {
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
    var core_1, authService_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authService_1_1) {
                authService_1 = authService_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(as) {
                    var _this = this;
                    this.as = as;
                    this.User = this.as.getUser();
                    this.as.pullUser(function () {
                        _this.User = _this.as.getUser();
                        _this.Books = _this.as.getBooks();
                        _this.Messages = _this.as.getMessages();
                        _this.Todos = _this.as.getTodos();
                    });
                }
                AppComponent.prototype.ngOnInit = function () {
                    $(".button-collapse").sideNav();
                    $('.modal-trigger').leanModal();
                };
                AppComponent.prototype.loginModel = function () {
                    $('.button-collapse').sideNav('hide');
                    $('#loginModel').openModal();
                };
                AppComponent.prototype.registerModel = function () {
                    $(".button-collapse").sideNav('hide');
                    $('#registerModel').openModal();
                };
                AppComponent.prototype.login = function (username, password) {
                    var _this = this;
                    this.as.login(username.value, password.value, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            _this.User = _this.as.getUser();
                            _this.Books = _this.as.getBooks();
                            _this.Messages = _this.as.getMessages();
                            _this.Todos = _this.as.getTodos();
                            setTimeout(function () {
                                $('.collapsible').collapsible({
                                    accordion: true
                                });
                            }, 1000);
                            console.log('User is Logged In!');
                        }
                    });
                };
                AppComponent.prototype.register = function (username, password) {
                    this.as.register(username.value, password.value, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('User is Registered!');
                        }
                    });
                };
                AppComponent.prototype.logout = function () {
                    var _this = this;
                    this.as.logout(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            _this.User = { username: null };
                            _this.Books = [];
                            _this.Messages = [];
                            _this.Todos = [];
                            console.log('User is Logged Out!');
                        }
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'ng2-app',
                        host: {},
                        styleUrls: [],
                        templateUrl: 'components/app/app.html',
                    }), 
                    __metadata('design:paramtypes', [authService_1.authService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
