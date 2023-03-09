const CustomersModel = require('../models/customers');
const { crypto } = require('../utils/password')

async function list(req, res) {
  const users = await CustomersModel.find()

  res.render('list', {
    title: 'Listagem de Clientes',
    users,
  })

}

function addForm(req, res) {
  res.render('register', {
    title: 'Cadastro de Clientes',
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

  const result = CustomersModel.create(params)

  if (result.affectedRows === 1) {
    message = 'Cadastro realizado com sucesso'
  } else {
    message = 'Deu erro moral'
  }

  res.render('edit', {
    title: 'Cadastro de Clientes',
    message: message
  })
}

async function editForm(req, res) {
  const { id } = req.query

  const user = await CustomersModel.findOne({ id })

  res.render('edit', {
    title: 'Editar Usuario',
    user: user,
  })
}

async function editAction(req, res) {
  const { name, age, email } = req.body
  const { id } = req.params
  let message = ''

  const params = {
    name: name,
    age: age,
    email: email
  }

  const result = await CustomersModel.update(id, params)
  const user = await CustomersModel.findOne({ id })

  if (result.affectedRows === 1) {
    message = 'Usuario atualizado com sucesso'
  } else {
    message = 'Deu erro moral'
  }

  res.render('edit', {
    title: 'Editar Usuario',
    user: user,
    message: message
  })
}

async function removeAction(req, res) {
  const { id } = req.params

  const user = await CustomersModel.destroy(id)

  res.redirect('/list')
}

module.exports = {
  list,
  addForm,
  addAction,
  editForm,
  editAction,
  removeAction
}
