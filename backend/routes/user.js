/* This code is defining a router for handling different routes related to user management in an
Express.js application. */
const express = require('express')
const { getUsers, deactivate, updateUser, getOneUser, deleteuser, makeAdmin } = require('../controllers/user')
const { verifyAdmin } = require('../middlewares/auth')

const router = express.Router()

router.route('/user').get(verifyAdmin, getUsers)
router.route('/user/deactivateaccount/:id').put(verifyAdmin, deactivate)
router.route('/user/:id').put(updateUser).get(verifyAdmin, getOneUser).delete(verifyAdmin, deleteuser)
router.route('/user/makeadmin/:id').put(verifyAdmin, makeAdmin)
module.exports = router
