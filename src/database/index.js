const mysql = require('promise-mysql')

async function connect() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projeto-mvc'
  })
}

module.exports = connect