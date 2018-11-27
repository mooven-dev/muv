
const { NODE_ENV } = process.env;

const config = {
  env: NODE_ENV || 'development',
  development: {
    conversation: 'https://hyundai-watson.now.sh/api/conversation',
    listWorkspaces: 'https://hyundai-watson.now.sh/api/list-workspaces',
    // conversation: 'http://localhost:4001',
    // listWorkspaces: 'http://localhost:4002',
    workspace_id: '60b42e0e-a820-4e6a-8075-c28a40766072',
  },
  test: {
    conversation: 'https://hyundai-watson.now.sh/api/conversation',
    listWorkspaces: 'https://hyundai-watson.now.sh/api/list-workspaces',
    workspace_id: '60b42e0e-a820-4e6a-8075-c28a40766072',
  },
  production: {
    conversation: 'https://hyundai-watson.now.sh/api/conversation',
    listWorkspaces: 'https://hyundai-watson.now.sh/api/list-workspaces',
    workspace_id: '60b42e0e-a820-4e6a-8075-c28a40766072',
  },
};

export default config[config.env];
