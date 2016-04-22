/// <reference path="../../../../node_modules/angular2/typings/browser.d.ts"/>

import { Component, OnInit } from 'angular2/core';
import { User, Books, Messages, Todos, authService } from '../services/authService';

@Component({
	selector: 'ng2-app',
	host: {},
    styleUrls: [],
	templateUrl: 'components/app/app.html',
})
export class AppComponent implements OnInit {

	User: User
	Books: Array<Books>
	Messages: Array<Messages>
	Todos: Array<Todos>

	constructor(public as: authService) {
		this.User = this.as.getUser();
		this.as.pullUser(() => {
			this.User = this.as.getUser();
			this.Books = this.as.getBooks();
			this.Messages = this.as.getMessages();
			this.Todos = this.as.getTodos();
		})
	}

	ngOnInit() {
		$(".button-collapse").sideNav();
		$('.modal-trigger').leanModal();
		
	}

	loginModel() {
		$('.button-collapse').sideNav('hide');
		$('#loginModel').openModal();
	}

	registerModel() {
		$(".button-collapse").sideNav('hide');
		$('#registerModel').openModal();
	}

	login(username: HTMLInputElement, password: HTMLInputElement) {
		this.as.login(username.value, password.value, (err) => {
			if(err) {
				console.log(err);
			} else {
				this.User = this.as.getUser();
				this.Books = this.as.getBooks();
				this.Messages = this.as.getMessages();
				this.Todos = this.as.getTodos();
				setTimeout(function() {
					$('.collapsible').collapsible({
						accordion : true
					});
				}, 1000);
				console.log('User is Logged In!');
			}
		});
	}

	register(username, password) {
		this.as.register(username.value, password.value, (err) => {
			if(err) {
				console.log(err);
			} else {
				console.log('User is Registered!');
			}
		});
	}

	logout() {
		this.as.logout((err) => {
			if(err) {
				console.log(err);
			} else {
				this.User = { username: null };
				this.Books = [];
				this.Messages = [];
				this.Todos = [];				
				console.log('User is Logged Out!');
			}
		});
	}

}