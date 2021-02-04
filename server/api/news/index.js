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
  }

  async fetchTopHeadlines(req, res) {
    if (req.body && req.body.code) {
      try {
        const response = await axios.get(
          `${config.newsUrl}top-headlines?country=${req.body.code}&apiKey=${config.apiKey1}`,
        );
        res.send(response.data.articles[0]);
      } catch (error) {
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
        logger.error(error);
      }
    }
  }
}

module.exports = { News };
