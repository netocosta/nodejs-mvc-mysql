const CustomersModel = require('../models/customers');
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'
const table = 'customers'

async function list(req, res) {
  CustomersModel.select(`SELECT * FROM ${table}`, function (error, result) {
    if (error) { throw error }

    res.render('list', {
      title: 'Listagem de Clientes',
      users: result,
    })
  })
}

function addForm(req, res) {
  res.render('register', {
    title: defaultTitle
  })
}

async function addAction(req, res) {
  const { name, age, email, password } = req.body

  const passwordCrypto = await crypto(password)

  const params = {
    name: name,
    age: age,
    email: email,
    password: passwordCrypto,
  }

  CustomersModel.insert(`INSERT INTO ${table} SET ?`, params, function (error, results, fields) {
    if (error) {
      console.log("Erro: " + error)
    }

    res.render('register', {
      title: defaultTitle,
      message: 'Cadastro realizado com sucesso'
    })
  })
}

async function editForm(req, res) {
  const { id } = req.query

  CustomersModel.select(`SELECT * FROM ${table} WHERE id=${id}`, function (error, result) {
    if (error) { throw error }

    res.render('edit', {
      title: 'Editar Usuario',
      user: result[0],
    })

  })
}

async function editAction(req, res) {
  const { name, age, email } = req.body
  const { id } = req.params

  const params = {
    name: name,
    age: age,
    email: email
  }

  CustomersModel.update(`UPDATE ${table} SET ? WHERE ID=${id}`, params, function (error, results, fields) {
    if (error) {
      console.log("Erro: " + error)
    }

    CustomersModel.select(`SELECT * FROM ${table} WHERE id=${id}`, function (error, result) {
      if (error) { throw error }

      res.render('edit', {
        title: 'Editar Usuario',
        user: result[0],
        message: 'Usuario atualizado com sucesso'
      })

    })

  })
}

async function removeAction(req, res) {
  const { id } = req.params

  CustomersModel.remove(`DELETE FROM ${table} WHERE ID=${id}`, function (error, results, fields) {
    if (error) {
      console.log("Erro: " + error)
    }

    res.redirect('/list')
  })

}

module.exports = {
  list,
  addForm,
  addAction,
  editForm,
  editAction,
  removeAction
}
