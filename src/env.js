
const { NODE_ENV } = process.env;

const apis = 'https://hyundai-watson.now.sh/apis/';

const config = {
  env: NODE_ENV || 'development',
  development: {
    conversation_api: `${apis}conversation`,
    // conversation_api: 'http://localhost:3000',
    bot_api: `${apis}bots`,
    // bot_api: 'http://localhost:3000',
  },
  test: {
    conversation_api: `${apis}conversation`,
    bot_api: `${apis}bots`,
  },
  production: {
    conversation_api: `${apis}conversation`,
    bot_api: `${apis}bots`,
  },
};

export default config[config.env];
