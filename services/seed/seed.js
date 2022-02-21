const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

let seedQuery = '';
const seed = require('./seed.json');

seed.data.forEach(item => {
	seedQuery = seedQuery + `DROP TABLE IF EXISTS ${item.title}; `;
});

seed.data.forEach(item => {
	seedQuery = seedQuery + `CREATE TABLE IF NOT EXISTS ${item.title} (${item.data}); `;
	console.log(`Creating ${item.title}`);
})

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	multipleStatements: true,
});

connection.connect();

connection.query(seedQuery, [], err => {
	if(err) {
		throw err
	};

	console.log("Seeding complete");
	connection.end();
})