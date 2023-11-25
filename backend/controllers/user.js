/* The code is importing the `User` model from the `../models/user` file and the `bcrypt` library. It
is also parsing the `salt` environment variable as an integer and assigning it to the `saltRounds`
constant. */
const User = require('../models/user')
const bcrypt = require('bcrypt')

const saltRounds = parseInt(process.env.salt)

/* The code is defining an asynchronous function called `getUsers` that takes in two parameters: `req`
(request) and `res` (response). This function is responsible for handling a GET request to retrieve
users from a database. */
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10

    const startIndex = (page - 1) * perPage

    // Requete vers la BD pour récupérer les utilisateurs
    const users = await User.find()
      .skip(startIndex)
      .limit(perPage)
      .exec()
    // Recupération du nombre total d'utilisateurs
    // const totalUser = await User.countDocuments({ $or: [{ role: 'user' }, { role: 'admin' }] })
    // Retour des données paginées
    return res.status(200).json({
      users
      // currentPage: page,
      // totalPages: Math.ceil(totalUser / perPage),
      // totalItems: totalUser
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
  }
}

/* The `deactivate` function is responsible for deactivating or reactivating a user account in
the database. */
exports.deactivate = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findOne({ _id: id })

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' })
    }

    if (user.is_active === false) {
      user.is_active = true
      await user.save()
      return res.status(200).json({ message: 'Compte réactivé avec succès' })
    } else if (user.is_active === true) {
      user.is_active = false
      await user.save()
      return res.status(200).json({ message: 'Compte désactivé avec succès' })
    }
  } catch (error) {
    console.error('Erreur lors de la désactivation du compte:', error)
    res.status(500).json({ error: 'Erreur lors de la désactivation du compte' })
  }
}

/* The `getOneUser` function is responsible for retrieving a single user from the database
based on the provided user ID. */
exports.getOneUser = async (req, res) => {
  try {
    const userId = req.parmas.id
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    res.json(user)
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur', error)
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur spécifié' })
  }
}

/* The `updateUser` function is responsible for updating the profile of a user in the database.
It takes in two parameters: `req` (request) and `res` (response). */
exports.updateUser = async (req, res) => {
  const user = req.body
  const userId = req.params.id

  try {
    const userToUpdate = await User.findById(userId)

    if (!userToUpdate) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Mise à jour des informations de l'utilisateur
    if (user.name) {
      userToUpdate.name = user.name
    }
    if (user.email) {
      userToUpdate.email = user.email
    }
    if (user.phone) {
      userToUpdate.phone = user.phone
    }
    if (user.role) {
      userToUpdate.role = user.role
    }

    if (user.password) {
      const passwordMOd = user.password

      const hashedPassword = await bcrypt.hash(passwordMOd, saltRounds)
      userToUpdate.password = hashedPassword
    }
    await userToUpdate.save()
    res.status(200).json({ message: 'Profil utilisateur mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil utilisateur' })
  }
}

/* The `deleteuser` function is responsible for deleting a user from the database. It takes in
two parameters: `req` (request) and `res` (response). */
exports.deleteuser = async (req, res) => {
  try {
    const userId = req.params.id

    // Recherche de l'utilisateur correspondant
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Suppression de l'utilisateur
    await User.deleteOne({ _id: userId })
    return res.status(200).json({ message: 'Utilisateur supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur', error)
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' })
  }
}

/* The `exports.makeAdmin` function is responsible for changing the role of a user to "admin" in the
database. It takes in two parameters: `req` (request) and `res` (response). */
exports.makeAdmin = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' })
    }

    // Faire Admin
    if (user.role === 'admin') {
      return res.status(400).json({ error: 'Cet utilisateur est déjà adminin' })
    } else {
      user.role = 'admin'
      await user.save()
      res.status(200).json({ message: 'Utilisateur est maintenant un administrateur' })
    }
  } catch (error) {
    console.error('Erreur lors du changement du statut de l\'utilisateur spécifié', error)
    res.status(500).json({ error: 'Erreur lors du changement du statut de l\'utilisateur spécifié' })
  }
}
