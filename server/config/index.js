const dev = {
  baseUrl: process.env.BASE_URL,
  apiKey1: process.env.APIKEY_1,
  apiKey2: process.env.APIKEY_2,
  port: process.env.PORT,
};

const prod = {
  apiKey3: process.env.APIKEY_3,
};

const config = {
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017',
  dbName: process.env.DB_NAME,
  newsUrl: process.env.NEWS_API,
  mongoDbAtlasUri: process.env.MONGODB_ATLAS_URI,
};

const all =
  process.env.NODE_ENV === 'development'
    ? { ...config, ...dev }
    : { ...config, ...prod };

module.exports = { config: all };
