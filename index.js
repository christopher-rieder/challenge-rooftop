require('dotenv').config();
const { getToken } = require('./src/api');
const sortBlocks = require('./src/sortBlocks');

const helpText = `
  Usage:
  --get-token   \t Get the token for a email
  --sort-blocks \t Fetch blocks, sort them and then check if the solution is correct.
`

const arg = process.argv[2]

if (arg === '--get-token') {
    getToken().then(console.log)
} else if (arg === '--sort-blocks') {
    sortBlocks()
} else {
    console.log(helpText)
}
