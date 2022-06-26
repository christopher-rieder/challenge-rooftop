require('dotenv').config();
const { getToken } = require('./src/api');
const sortBlocks = require('./src/sortBlocks');

const helpText = `
  Usage:
  --get-token   \t Get the token. Needs a EMAIL environment variable.
  --sort-blocks \t Sorts the blocks. Needs a TOKEN environment variable.

  The environment variables can be provided in a .env file if running locally
  Or configured in the operative system or cloud configuration.
`

const arg = process.argv[2]

if (arg === '--get-token') {
    getToken().then(console.log)
} else if (arg === '--sort-blocks') {
    sortBlocks()
} else {
    console.log(helpText)
}
