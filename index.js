const {faker} = require("@faker-js/faker");
const mysql = require("mysql2");

// this is how to create a connection nodejs to sql
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "store",
    password : "root"
});

// simple query 

// let insert something into customer table

// let q = "insert into customer (id, username, email, password) values (?, ?, ?, ?)";

// this is one way to insert data using faker package

// let valu = [faker.string.uuid(), faker.internet.username(), faker.internet.email(), faker.internet.password()];

/**
 * we can also insert data manually ..
 */

// let insetIntoUser = "insert into users (id, name, email, phoneNo, city, state) values ?";

// let userData = [
//     [101, "Md Afzal Ansari", "ansari.afzal@edupoint.edu", 9955118287, "Mumbai", "Maharashtra"],
//     [102, "Md Firoz Alam", "alam.firoz@edupoint.edu", 8256987690 ,"Ranchi", "Jharkhand"],
//     [103, "Gulam Rabbani", "glg.rabbani@edupoint.edu", 7689564976, "Chandigarh", "Punjab"],
//     [104, "Haider Ali", "ali.haider@edupoint.edu", 7985785423, "Bhagalpur", "Bihar"],
//     [105, "Md Faizal Ansari", "faizal@edupoint.edu", 9985784767, "Sabor", "Bihar"],
//     [106, "Kajal Yadhuvashi", "yadhu.kajal@edupoint.edu", 8790577865, "Kanpur", "Uttar Pradesh"],
//     [107, "Nisha Poddar", "poddar.nisha@edupoint.edu", 8976347865, "Kolkata", "West Bengal"],
//     [108, "Shweta Mahto", "mahto.shweta@edupoint.edu", 9087998456, "New Delhi", "Delhi"],
//     [109, "Rakhi Verma", "verma.rakhi@edupoint.edu", 8945753589, "Madhubani", "Bihar"],
//     [110, "Abid Ansari", "ansari.abid@edupoint.edu", 7865908765, "Godda", "Jharkhand"],
//     [111, "Sammi Ansari", "ansari.sammi@edupoint.edu", 9981325645, "Bokaro", "Jharkhand"],
//     [112, "Saloni Bhagat", "bhagat.saloni@edupoint.edu", 8976356754, "Ranchi", "Jharkhand"]
// ];

// try {

//     connection.query(insetIntoUser, [userData], (err, res)=> {
//         if(err)
//             throw err;

//         console.log(res);
//     });

// } catch (err) {
//     console.log(err);
// }


/**
 * Let insert data into bulk using "@faker-js/faker" package
 */

let getRandomData = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
    ]
};

let query_bulk = "insert into user2 (id, username, email, password) values ?";

let data = [];

for (let i = 0; i < 100; ++i) {
    data.push(getRandomData());
}

try {
    connection.query(query_bulk, [data], (err, res) => {
        if (err)
            throw err;

        console.log(res);
    });
} catch(err) {
    console.log(err);
}

connection.end();

// let createRandomUser = () => {
//     return {
//       userId: faker.string.uuid(),
//       username: faker.internet.username(), // before version 9.1.0, use userName()
//       email: faker.internet.email(),
//       avatar: faker.image.avatar(),
//       password: faker.internet.password(),
//       birthdate: faker.date.birthdate(),
//       registeredAt: faker.date.past(),
//     };
// }

// let getRandomUser = () => {
//     return {
//         id : faker.string.uuid(),
//         username : faker.internet.username(),
//         email : faker.internet.email(),
//         password : faker.internet.password(),
//     };
// };

  
// console.log(createRandomUser());

// console.log(getRandomUser());
