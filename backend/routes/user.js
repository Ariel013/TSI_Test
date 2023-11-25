const express = require('express')
const { getUsers, deactivate, updateUser, getOneUser, deleteuser, getOneAdmin, makeAdmin } = require('../controllers/user')
const router = express.Router()

router.route('/users').get(getUsers)
router.route('/users/deactivateaccount/:id').post(deactivate)
router.route('/users/:id').put(updateUser).get(getOneUser).delete(deleteuser)
router.route('/users/admin/:id').get(getOneAdmin)
router.route('/users/makeadmin/:id').put(makeAdmin)
module.exports = router
