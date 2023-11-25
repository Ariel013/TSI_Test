const express = require('express')
const { getUsers, deactivate, updateUser, getOneUser, deleteuser, makeAdmin } = require('../controllers/user')
const router = express.Router()

router.route('/user').get(getUsers)
router.route('/user/deactivateaccount/:id').put(deactivate)
router.route('/user/:id').put(updateUser).get(getOneUser).delete(deleteuser)
router.route('/user/makeadmin/:id').put(makeAdmin)
module.exports = router
