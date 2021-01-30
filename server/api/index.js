var express = require('express');

var router = express.Router();
const User = require('../db/models/userSchema');
const { logger } = require('../logger');

router.post('/api/user', async (req, res) => {
  if (req && req.body && req.body.email && req.body.password && req.body.name) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const updated = await user.save();
      res.json(updated);
    } catch (e) {
      logger.info('Db couldnt save the user');
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

router.get('/ping', (req, res) => {
  console.log('pong');
  res.end();
});

module.exports = router;
