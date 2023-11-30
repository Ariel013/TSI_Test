/* This code is setting up a router for handling different routes in a Node.js application using the
Express framework. */
const express = require('express')
const { register, login, getInfo } = require('../controllers/auth/auth')
const { confirmationEmail } = require('../controllers/auth/confirmation')

const router = express.Router()

router.route('/register').post(register)
router.route('/getinfo').get(getInfo)
router.route('/login').post(login)
router.route('/confirm/:token').get(confirmationEmail)

module.exports = router
