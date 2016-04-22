/// <reference path="../../../../typings/tsd.d.ts" />

import * as mongoose         from "mongoose";
// import * as bcrypt           from "bcrypt";

// let SALT_WORK_FACTOR: Number = 10;

/*let userSchema : mongoose.Schema = new mongoose.Schema({
	email : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	role: {
        type: String,
        required: true
    }
});

export interface IUser extends mongoose.Document {
	email  : string,
	password : string,
	role: string
}*/

let userSchema: mongoose.Schema = new mongoose.Schema({
    id: Number,
    guid: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    salt: String,
    todo: [
        {
            id: Number,
            status: String,
            priority: String,
            date: Date,
            description: String
        }
    ],
    messages: [
        {
            id: Number,
            contact: {
                firstname: String,
                lastname: String,
                university: {
                    id: Number,
                    name: String,
                    address: String,
                    city: String,
                    state: String,
                    zip: String,
                    website: String,
                    latitude: Number,
                    longitude: Number
                }
            },
            date: Date,
            category: String,
        content: String
        }
    ],
    books: [
        {
            id: Number,
            isbn10: Number,
            isbn13: Number,
            title: String,
            category: String
        }
    ]
});

export interface IUser extends mongoose.Document {
    id: string,
    guid: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    salt: String,
    todo: [
        {
            id: Number,
            status: String,
            priority: String,
            date: Date,
            description: String
        }
    ],
    messages: [
        {
            id: Number,
            contact: {
                firstname: String,
                lastname: String,
                university: {
                    id: Number,
                    name: String,
                    address: String,
                    city: String,
                    state: String,
                    zip: String,
                    website: String,
                    latitude: Number,
                    longitude: Number
                }
            },
            date: Date,
            category: String,
            content: String
        }
    ],
    books: [
        {
            id: Number,
            isbn10: Number,
            isbn13: Number,
            title: String,
            category: String
        }
    ]
}

// userSchema.method['comparePassword'] = function(candidatePassword: String, cb: Function) {
//     bcrypt.compare(candidatePassword, this.password, function(err: Error, isMatch: Boolean) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

export let User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);