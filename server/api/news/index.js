const axios = require('axios');

const { logger } = require('../../logger');
const { config } = require('../../config');

class News {
  constructor(router) {
    this.router = router;
    this.fetchNews();
  }

  fetchNews() {
    this.router.get('/news/topHeadlines', this.fetchTopHeadlines.bind(this));
    this.router.get('/news/search', this.fetchSearchedNews.bind(this));
    //TODO proper route name
    this.router.get(
      '/news/category&country',
      this.fetchNewsByCategoryAndCountry.bind(this),
    );
  }

  async fetchTopHeadlines(req, res) {
    if (req.body && req.body.code) {
      try {
        const response = await axios.get(
          `${config.newsUrl}top-headlines?country=${req.body.code}&apiKey=${config.apiKey1}`,
        );
        res.send(response.data.articles[0]);
      } catch (error) {
        res.sendStatus(404);
        logger.error(error);
      }
    }
  }

  async fetchSearchedNews(req, res) {
    if (req.body && req.body.query) {
      try {
        const response = await axios.get(
          `${config.newsUrl}everything?q=${req.body.query}&apiKey=${config.apiKey1}`,
        );
        res.send(response.data.articles[0]);
      } catch (error) {
        res.sendStatus(404);
        logger.error(error);
      }
    }
  }

  async fetchNewsByCategoryAndCountry(req, res) {
    if (req.body && req.body.category && req.body.country) {
      try {
        const response = await axios.get(
          `${config.newsUrl}top-headlines?sortBy=${'publishedAt'}&category=${
            req.body.category
          }&country=${req.body.country}&apiKey=${config.apiKey1}`,
        );
        res.send(response.data.articles[0]);
      } catch (error) {
        res.sendStatus(404);
        logger.error(error);
      }
    }
  }
}

module.exports = { News };
