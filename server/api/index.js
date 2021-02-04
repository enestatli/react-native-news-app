const express = require('express');

const router = express.Router();

const { User } = require('./User');
const { News } = require('./News');

new User(router);

new News(router);

module.exports = router;
