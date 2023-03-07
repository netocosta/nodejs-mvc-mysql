const router = require('express').Router()

const IndexController = require('../controllers/index')
const CustomersController = require('../controllers/customers')

// home
router.get('/', IndexController.index)

// registro
router.get('/list', CustomersController.list)
router.get('/register', CustomersController.addForm)
router.post('/register/add', CustomersController.addAction)
router.get('/register/edit', CustomersController.editForm)
router.post('/register/edit/:id', CustomersController.editAction)
router.get('/register/remove/:id', CustomersController.removeAction)

module.exports = router