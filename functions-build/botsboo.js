/* example using https://github.com/dougmoscrop/serverless-http */
const serverless = require('serverless-http');
const expressApp = require('./server/app');

// We need to define our function name for express routes to set the correct base path
const functionName = 'botsboo'

// Initialize express app
const app = expressApp(functionName)

// Export lambda handler
exports.handler = serverless(app)
