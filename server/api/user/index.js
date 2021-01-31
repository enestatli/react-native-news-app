const logger = require('../../logger');

class User {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/user/register', this.registerUser.bind(this));
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
        //create new user
        //send user back
      } catch (error) {
        // server error 500
      }
    }
  }
}

module.exports = { User };
