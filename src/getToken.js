require('dotenv').config();

const { getToken } = require('../src/api');

async function requestToken() {
    let email = process.env.EMAIL
    const emailArgvIndex = process.argv.findIndex(arg => arg === '--email')
    if (emailArgvIndex > 0) {
        email = process.argv[emailArgvIndex + 1]
    }

    if (!email) {
        console.error('To get the token you need to provide an --email parameter or set a EMAIL environment variable')
        process.exit(1)
    }

    const token = await getToken(email)
    console.log("e-mail:\t", email)
    console.log("token:\t", token)
}

module.exports = requestToken