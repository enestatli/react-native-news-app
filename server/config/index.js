const dev = {
  api: 'selam',
};

const prod = {
  api: 'bye',
};

const config = {
  url: 'www',
};

const all =
  process.env.NODE_ENV === 'development'
    ? { ...config, ...dev }
    : { ...config, ...prod };

module.exports = { config: all };
