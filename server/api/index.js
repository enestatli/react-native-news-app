const express = require('express');

const router = express.Router();

const { User } = require('./User');

new User(router);

module.exports = router;
