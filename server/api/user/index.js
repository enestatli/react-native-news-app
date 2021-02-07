const UserModel = require('../../db/models/userSchema');
const { logger } = require('../../logger');
const {
  protectWithApiKey,
} = require('../../middleware/protectWithApiKey/index');

class User {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      '/user/register',
      protectWithApiKey,
      this.registerUser.bind(this),
    );
    this.router.post(
      '/user/login',
      protectWithApiKey,
      this.loginUser.bind(this),
    );
    this.router.post(
      '/user/save-news',
      protectWithApiKey,
      this.saveNews.bind(this),
    );
  }

  async saveNews(req, res) {
    if (
      !req ||
      !req.body ||
      !req.body.url ||
      !req.body.email ||
      !req.body.imgUrl ||
      !req.body.title
    ) {
      res.sendStatus(422); // unprocessable entity
      return;
    }
    const user = await UserModel.findOne({ email: req.body.email });

    const savedBody = {
      url: req.body.url,
      img_url: req.body.imgUrl,
      title: req.body.title,
    };

    if (!user.saved_news || !user.saved_news.length) {
      user.saved_news = [savedBody];
      user.save();
      res.json(user);
      return;
    }

    const exist = user.saved_news.some((news) => news.url === req.body.url);

    if (!exist) {
      user.saved_news = [...user.saved_news, savedBody];

      user.save();
      res.json(user);
      return;
    }
  }

  async loginUser(req, res) {
    if (!req || !req.body || !req.body.email || !req.body.password) {
      res.sendStatus(422); // Unprocessable Entity
      return;
    }

    const user = await UserModel.login(req.body.email, req.body.password);
    try {
      if (!user || !user.email) {
        res.sendStatus(user);
        return;
      }
      res.json(user);
    } catch (error) {
      logger.error(error);
      res.sendStatus(500);
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
        res.sendStatus(409); // conflict
      } catch (error) {
        logger.error(error);
        res.sendStatus(500);
      }
    }
  }
}

module.exports = { User };
