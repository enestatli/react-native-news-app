const BASE_URL = 'https://newsapi.org/v2/';
const APIKEY = 'dd5c6e37b34c4a588a2b663f3f0196cc';

// const somurulesiURL =
//   'https://newsapi.org/v2/top-headlines?sortBy=publishedAt&category=health&country=us&apiKey=dd5c6e37b34c4a588a2b663f3f0196cc';

const getTopHeadlines = async (code) => {
  const reponse = await fetch(
    `${BASE_URL}top-headlines?country=${code}&apiKey=${APIKEY}`,
  );
  const data = await reponse.json();
  return data;
};

const getSearchNews = async (query) => {
  const response = await fetch(
    `${BASE_URL}everything?q=${query}&apiKey=${APIKEY}`,
  );
  const data = await response.json();
  return data;
};

const getCategoryNews = async (category) => {
  const response = await fetch(
    `${BASE_URL}top-headlines?sortBy=${'publishedAt'}&category=${category}&country=${'us'}&apiKey=${APIKEY}`,
  );
  const data = await response.json();
  return data;
};

export { getTopHeadlines, getCategoryNews, getSearchNews };
