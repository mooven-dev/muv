
const { NODE_ENV } = process.env;

const config = {
  env: NODE_ENV || 'development',
  development: {
    conversation_api: 'https://hyundai-watson.now.sh/apis/conversation',
    // conversation_api: 'http://localhost:4001',
    workspace_id: 'bee3a755-2708-4185-8958-08bd8f1dcbef',
  },
  test: {
    conversation_api: 'https://hyundai-watson.now.sh/apis/conversation',
    workspace_id: 'bee3a755-2708-4185-8958-08bd8f1dcbef',
  },
  production: {
    conversation_api: 'https://hyundai-watson.now.sh/apis/conversation',
    workspace_id: 'bee3a755-2708-4185-8958-08bd8f1dcbef',
  },
};

export default config[config.env];
