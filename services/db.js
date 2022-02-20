const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {

  let results;

  const connection = await mysql.createConnection(config.db);
  await connection.execute(sql, params)
  .then((res) => {
    results = res.results;
    console.log(res.results);
  }).catch((err) => {
    console.log(err)
  });

  //return results;
}

module.exports = {
  query
}