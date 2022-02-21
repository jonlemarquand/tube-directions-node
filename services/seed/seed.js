const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

let seedQuery = '';
const seed = require('./seed.json');

seed.data.forEach(item => {
	seedQuery = seedQuery + `DROP TABLE IF EXISTS ${item.title}; `;
});

seed.data.forEach(item => {
	seedQuery = seedQuery + `CREATE TABLE IF NOT EXISTS ${item.title} (${item.columns}); `;
	console.log(`Creating ${item.title}`);
});

seed.data.forEach(item => {
	if(item.data) {
		let seedData = '';
		item.data.content.forEach((i, index, data) => {
			if(index === data.length - 1) {
				seedData = seedData + '(' + data[index] + ');'
			} else {
				seedData = seedData + '(' + data[index] + '),'
			}
		});
		seedQuery = seedQuery + `INSERT INTO ${item.title} (${item.data.headers}) VALUES ${seedData}`;
	}
});

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