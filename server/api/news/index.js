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

  // async fetchTopHeadlines(req, res) {
  //   try {
  //     const response = await axios.get(
  //       // `${config.newsUrl}top-headlines?country=${req.body.code}&apiKey=${config.apiKey1}`,
  //       `${config.newsUrl}top-headlines?country=tr&apiKey=${config.apiKey1}`,
  //     );
  //     logger.info(response);
  //     // const data = await reponse.data();
  //     // return data;
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // }

  fetchTopHeadlines(req, res) {
    res.send('Hello World');
  }
}

module.exports = { News };
