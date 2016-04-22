import {Injectable} from 'angular2/core';
import {httpService} from './httpService';

export interface User {username: string}

export interface Books {id: number, category: string, isbn10: number, isbn13: number, title: string}

export interface Messages {id: number, category: string, contact: string, content: string, date: Date}

export interface Todos {id: number, description: string, priority: string, status: string, date: Date}

@Injectable()
export class authService {

	User: User = {
		username: null
	}
	
	Books: Array<Books> = [];
	
	Messages: Array<Messages> = [];
	
	Todos: Array<Todos> = [];

	constructor(public hs: httpService) {
		
	}

	getUser() {
		return this.User;
	}
	
	getBooks() {
		return this.Books;
	}
	
	getMessages() {
		return this.Messages;
	}
	
	getTodos() {
		return this.Todos;
	}
	
	pullUser(cb) {
		let username = localStorage.getItem('pubApp');
		if (username) {
			this.hs.getJSON('/api/v1/user/loggedin/' + username, (res) => {
				if(res.success) {
					this.User.username = res.data.firstname + ' ' + res.data.lastname;
					this.Books = res.data.books ? res.data.books : [];
					this.Messages = res.data.messages ? res.data.messages : [];
					this.Todos = res.data.todo ? res.data.todo : [];
					localStorage.setItem('pubApp', res.data.username)
					cb();
				} else {
					this.User.username = '';
					localStorage.removeItem('pubApp');
					cb();
				}
			})
		}
	}

	login(username, password, cb) {
		this.hs.addJSON('/api/v1/user/signin', {username: username, password: password}, (res) => {
			if(res.success) {
				this.User.username = res.data.firstname + ' ' + res.data.lastname;
				this.Books = res.data.books;
				this.Messages = res.data.messages;
				this.Todos = res.data.todo;
				localStorage.setItem('pubApp', res.data.username)
				cb();
			} else {
				cb(res.error);
			}
		});
	}

	register(username, password, cb) {
		this.hs.addJSON('/api/v1/user/signup', { username: username, password: password }, (res) => {
			if(res.success) {
				cb();
			} else {
				cb(res.error);
			}
		});
	}

	logout(cb) {
		this.hs.addJSON('/api/v1/user/signout', {}, (res) => {
			if(res.success) {
				cb();
				this.User = { username: null };
				localStorage.removeItem('pubApp');
			} else {
				cb(res.error);
			}
		});
	}
}