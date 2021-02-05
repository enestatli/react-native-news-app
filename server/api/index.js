const express = require('express');

const router = express.Router();

const { User } = require('./User');
const { News } = require('./News');
const { Comment } = require('./Comment');


new User(router);

new News(router);

new Comment(router)

module.exports = router;
