const {faker} = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { connect } = require("http2");

app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));



// this is how to create a connection nodejs to sql
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "store",
    password : "root"
});



/**
 * '/' means home route.
 * implementing the home route such a way, it display the total number of users. . .
 */
let count;
app.get("/", (req, res)=> {
    // this is the sql command.
    let que = `select count(*) from user2`;
    try {
        connection.query(que, (err, result)=> {
            if (err)
                throw err;

            count = result[0]["count(*)"];
            res.render("home.ejs", {count});
        });
    } catch (err) {
        res.send(`Some error is DB : ${err}`);
    }
});

/**
 * implementing 
 * "/users"     fetch and show userid username and email,
 */


app.get("/users", (req, res) => {
    let que = `select * from user2`;
    try {
        connection.query(que, (err, users)=> {
            if (err)
                throw err;
            res.render("user.ejs", {users, count});

        })
    } catch (err) {
        res.send(`Some error in the database. ${err}`);
    }
});

/**
 * implementing 
 * /student-data  => get all the students information.
 */

app.get("/student", (req, res) => {
    let que = `select * from users`;
    try {
        connection.query(que, (err, studentData)=> {
            if (err)
                throw err;

            res.render("studentdata.ejs", {studentData});
        });
    } catch(err) {
        console.log(`Some error in database : ${err}`);
    }
});

/**
 * let implement edit users data like username
 */

app.get("/user/:id/edit", (req, res)=> {
    let {id} = req.params;
    let q = `select * from user2 where id = '${id}'`;

    try {
        connection.query(q, (err, result)=> {
            if (err)
                throw err;

            let user = result[0];
            res.render("edit.ejs", {user});
        })
    } catch(err) {
        console.log(`Some error in DB ${err}`);
    }
});

/**
 * UPDATE THE DATA INTO DB
 */

app.patch("/user/:id", (req, res)=> {
    let {id} = req.params;
    let {password : formPassword, username : newUsername} = req.body;

    let q = `select * from user2 where id = '${id}'`;

    try {
        connection.query(q, (err, result)=> {
            if (err)
                throw err;

            let user = result[0];

            if (formPassword !== user.password) {
                res.send("WRONG PASSWORD");
            } else {
                let updateQ = `update user2 set username ='${newUsername}' where id ='${id}'`;
                connection.query(updateQ, (err, result2)=> {
                    if (err)
                        throw err;
                    res.send(result2);
                });
            }
        });
    } catch(err) {
        console.log(`Error in the database ${err}`);
    }
});


/**
 * let's implementing students data
 * 
 */

app.get("/student/:id/edit", (req, res)=> {
    let {id} = req.params;
    let q = `select * from users where id = '${id}'`;

    try {
        connection.query(q, (err, result)=> {
            if (err)
                throw err;

            let student = result[0];
            res.render("updateStudent.ejs", {student});
        });
    } catch (err) {
        console.err(`Something wrong with the DB : ${err}`);
    }
});

/**
 * do it by today : March 18, 2025
 */

app.patch("student/:id", (req, res)=> {
    let id = req.params;
    let {username : newUser, pass1 : password1, pass2 : password2} = req.body;
    console.log(req.body);
    let q = `select * from users where id = '${id}'`;

    try {
        connection.query(q, (err, result)=> {
            if (err)
                throw err;

            let student = result[0];

            if (pass1 != pass2) {
                console.log(result);
                res.send("password doesn't match, please enter again . . .");
            } else {
                let updateQuery = `update users set username = '${newUser}' where id = '${id}'`;
                connection.query(updateQuery, (err, result)=> {
                    if (err)
                        throw err;

                    res.send(result);
                });
            }

        });
    } catch(err) {
        console.log(`Something wrong with database : ${err}`);
    }
});




/**
 * Let insert data into bulk using "@faker-js/faker" package
 */

// let getRandomData = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password()
//     ]
// };

// let query_bulk = "insert into user2 (id, username, email, password) values ?";

// let data = [];

// for (let i = 0; i < 100; ++i) {
//     data.push(getRandomData());
// }

// try {
//     connection.query(query_bulk, [data], (err, res) => {
//         if (err)
//             throw err;

//         console.log(res);
//     });
// } catch(err) {
//     console.log(err);
// }

// connection.end();


app.listen("8080", ()=> {
    console.log("Server is listening to port 8080.");
});