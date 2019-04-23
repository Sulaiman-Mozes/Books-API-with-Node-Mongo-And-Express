const express = require('express');
const validate = require('express-validation');

const booksValidator = require('../middleware/validators/books');
const usersValidator = require('../middleware/validators/users');
const authenticate = require('../middleware/authenticate');

const books = require('./contollers/books');
const users = require('./contollers/users');

const router = express.Router();
const apiURl = '/api/v1'


/** Book Routes */
router.get(`${apiURl}/books`, validate(booksValidator.queryValidator), books.list);
router.get(`${apiURl}/books/:book_id`, books.findByID, books.get);
router.post(`${apiURl}/books`, [authenticate, validate(booksValidator.addValidator)], books.create);
router.put(`${apiURl}/books/:book_id`, [authenticate, books.findByID], books.update);
router.delete(`${apiURl}/books/:book_id`, [authenticate, books.findByID], books.remove);

/** User Routes */
router.post(`${apiURl}/auth/signup`, validate(usersValidator.create), users.CreatefindOne, users.create);
router.post(`${apiURl}/auth/login`, validate(usersValidator.login), users.login);

router.use((err, req, res, next) => {
    res.status(400).json(err);
    return next();
});

module.exports = router;