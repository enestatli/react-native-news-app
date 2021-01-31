const express = require('express');

const router = express.Router();
const User = require('../db/models/userSchema');
const { logger } = require('../logger');

router.post('/api/user', async (req, res) => {
  if (req && req.body && req.body.email && req.body.name && req.body.password) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const updated = await user.save();
      res.json(updated);
    } catch (error) {
      logger.error('Db could not save the user', error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

router.get('/ping', (req, res) => {
  logger.info('pong');
  res.end();
});

module.exports = router;
