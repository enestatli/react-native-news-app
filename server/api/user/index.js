const UserModel = require('../../db/models/userSchema');
const { logger } = require('../../logger');

class User {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/user/register', this.registerUser.bind(this));
    this.router.post('/user/login', this.loginUser.bind(this));
  }

  async loginUser(req, res) {
    if (req && req.body && req.body.email && req.body.password) {
      try {
        const user = await UserModel.login(req.body.email, req.body.password);
        if (user && user.email) {
          return res.json(user);
        }
        res.sendStatus(401);
      } catch (error) {
        //TODO fix this incorrect email error
        logger.error(error);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(403);
    }
  }

  async registerUser(req, res) {
    if (
      req &&
      req.body &&
      req.body.name &&
      req.body.email &&
      req.body.password
    ) {
      try {
        const user = await UserModel.createNew({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        if (user && user.email) {
          res.json(user);
          return;
        }
        res.sendStatus(409);
      } catch (error) {
        logger.error(error);
        res.sendStatus(500);
      }
    }
  }
}

module.exports = { User };
