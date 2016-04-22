var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100, // important
    host: "localhost",
    user: "root",
    password: "123",
    database: "koodkaco",
    debug: false
});

export function handle_database(query, callBack) {

    pool.getConnection(function (err, connection) {

        if (err) {
            console.log(err);
            connection.release();
            callBack({ error: true, msg: "Error in connection database: " + err });
            // res.json({ "code": 100, "status": "Error in connection database" });
            // return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                callBack({ error: false, data: rows });
                // res.json(rows);
            }
        });

        connection.on('error', function (err) {
            callBack({ error: true, msg: "Error in connection database: " + err });
            // res.json({ "code": 100, "status": "Error in connection database" });
            // return;
        });

    });

}




// export function handle_database(func, callBack) {

//     pool.getConnection(function (err, connection) {
//         if (err) {
//             console.log(err);
//             connection.release();
//             callBack();
//             // res.json({ "code": 100, "status": "Error in connection database" });
//             return;
//         }

//         console.log('connected as id ' + connection.threadId);

//         // call function
//         func(connection, callBack);

//         connection.on('error', function (err) {
//             callBack({ error: true, msg: "Error in connection database: " + err });
//             // res.json({ "code": 100, "status": "Error in connection database" });
//             return;
//         });
//     });

// }

// export let dbFunctions = {

//     IsUserExists: (connection, callBack) => {
//         let query = "SELECT * FROM `as_seller` WHERE `email` = 'tipsclick@gmail.com'"; 
//         connection.query("select * from table1", function (err, rows) {
//             connection.release();
//             if (!err) {
//                 callBack({ error: false, data: rows });
//                 // res.json(rows);
//             }
//         });
//     },
//     Signup: (connection, callBack) => {
//         connection.query("select * from table1", function (err, rows) {
//             connection.release();
//             if (!err) {
//                 callBack({ error: false, data: rows });
//                 // res.json(rows);
//             }
//         });
//     },
//     Signin: (connection, callBack) => {
//         connection.query("select * from table1", function (err, rows) {
//             connection.release();
//             if (!err) {
//                 callBack({ error: false, data: rows });
//                 // res.json(rows);
//             }
//         });
//     }

// };

// // select all users


// // signup


// // signin



// handle_database(SelectAllUsers, function (d) { 
// });