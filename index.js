#! /usr/bin/env node
const getToken = require('./src/getToken');
const sortBlocks = require('./src/sortBlocks');

const helpText = `
    Usage:
\t --get-token          Get the token for a email
\t --sort-blocks        Fetch blocks, sort them and then check if the solution is correct.

\t --email [email]      Provide an email for --get-token command.
\t --token [token]      Provide a token for --sort-blocks command.

    Example: 
\t check-challenge --get-token --email your.email@gmail.com
\t\t Get token for your.email@gmail.com email

\t check-challenge --get-token
\t\t Get token. Reads email from EMAIL environment variable

\t check-challenge --sort-blocks --token your-token-here
\t\t Executes the program. Uses the token passed as argument

\t check-challenge --sort-blocks
\t\t Executes the program. Reads the TOKEN environment variable
`

const arg = process.argv[2]

if (arg === '--get-token') {
    getToken()
} else if (arg === '--sort-blocks') {
    sortBlocks()
} else {
    console.log(helpText)
}
