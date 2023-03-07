var conn = require('../database')

function select(query, callback) {
  conn.query(query, function (err, rows) {
    callback(err, rows)
  })
}

function insert(query, params, callback) {
  conn.query(query, params, function (err, rows) {
    callback(err, rows)
  })
}

function update(query, params, callback) {
  conn.query(query, params, function (err, rows) {
    callback(err, rows)
  })
}

function remove(query, callback) {
  conn.query(query, function (err, rows) {
    callback(err, rows)
  })
}

module.exports = { select, insert, update, remove }