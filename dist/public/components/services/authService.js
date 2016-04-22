System.register(['angular2/core', './httpService'], function(exports_1, context_1) {
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
    var core_1, httpService_1;
    var authService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpService_1_1) {
                httpService_1 = httpService_1_1;
            }],
        execute: function() {
            authService = (function () {
                function authService(hs) {
                    this.hs = hs;
                    this.User = {
                        username: null
                    };
                    this.Books = [];
                    this.Messages = [];
                    this.Todos = [];
                }
                authService.prototype.getUser = function () {
                    return this.User;
                };
                authService.prototype.getBooks = function () {
                    return this.Books;
                };
                authService.prototype.getMessages = function () {
                    return this.Messages;
                };
                authService.prototype.getTodos = function () {
                    return this.Todos;
                };
                authService.prototype.pullUser = function (cb) {
                    var _this = this;
                    var username = localStorage.getItem('pubApp');
                    if (username) {
                        this.hs.getJSON('/api/v1/user/loggedin/' + username, function (res) {
                            if (res.success) {
                                _this.User.username = res.data.firstname + ' ' + res.data.lastname;
                                _this.Books = res.data.books ? res.data.books : [];
                                _this.Messages = res.data.messages ? res.data.messages : [];
                                _this.Todos = res.data.todo ? res.data.todo : [];
                                localStorage.setItem('pubApp', res.data.username);
                                cb();
                            }
                            else {
                                _this.User.username = '';
                                localStorage.removeItem('pubApp');
                                cb();
                            }
                        });
                    }
                };
                authService.prototype.login = function (username, password, cb) {
                    var _this = this;
                    this.hs.addJSON('/api/v1/user/signin', { username: username, password: password }, function (res) {
                        if (res.success) {
                            _this.User.username = res.data.firstname + ' ' + res.data.lastname;
                            _this.Books = res.data.books;
                            _this.Messages = res.data.messages;
                            _this.Todos = res.data.todo;
                            localStorage.setItem('pubApp', res.data.username);
                            cb();
                        }
                        else {
                            cb(res.error);
                        }
                    });
                };
                authService.prototype.register = function (username, password, cb) {
                    this.hs.addJSON('/api/v1/user/signup', { username: username, password: password }, function (res) {
                        if (res.success) {
                            cb();
                        }
                        else {
                            cb(res.error);
                        }
                    });
                };
                authService.prototype.logout = function (cb) {
                    var _this = this;
                    this.hs.addJSON('/api/v1/user/signout', {}, function (res) {
                        if (res.success) {
                            cb();
                            _this.User = { username: null };
                            localStorage.removeItem('pubApp');
                        }
                        else {
                            cb(res.error);
                        }
                    });
                };
                authService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [httpService_1.httpService])
                ], authService);
                return authService;
            }());
            exports_1("authService", authService);
        }
    }
});
