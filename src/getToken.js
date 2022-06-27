require('dotenv').config();

const { requestToken } = require('../src/api');

async function getToken() {
    let email = process.env.EMAIL
    const emailArgvIndex = process.argv.findIndex(arg => arg === '--email')
    if (emailArgvIndex > 0) {
        email = process.argv[emailArgvIndex + 1]
    }

    if (!email) {
        console.error('To get the token you need to provide an --email parameter or set a EMAIL environment variable')
        process.exit(1)
    }

    const token = await requestToken(email)
    console.log("e-mail:\t", email)
    console.log("token:\t", token)
}

module.exports = getToken