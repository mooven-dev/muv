
const { NODE_ENV } = process.env;

const config = {
  env: NODE_ENV || 'development',
  development: {
    endPoint: 'http://localhost:1337/',
    // endPoint: 'https://hyundai.mybluemix.net/',
    // endPoint: 'http://localhost:3000/',
  },
  test: {
    endPoint: 'https://hyundai.mybluemix.net/',
  },
  production: {
    endPoint: 'https://hyundai.mybluemix.net/',
  },
};

export default config[config.env];
