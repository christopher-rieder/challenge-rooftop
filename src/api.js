require('dotenv').config();
const axios = require('axios')

let TOKEN = process.env.TOKEN
const tokenArgvIndex = process.argv.findIndex(arg => arg === '--token')
if (tokenArgvIndex > 0) {
    TOKEN = process.argv[tokenArgvIndex + 1]
}

const urls = {
    token: "https://rooftop-career-switch.herokuapp.com/token?email=",
    blocks: "https://rooftop-career-switch.herokuapp.com/blocks",
    check: "https://rooftop-career-switch.herokuapp.com/check",
}

function checkToken(token) {
    if (!token || typeof token !== 'string') {
        console.error('Error: Token should be provided through a TOKEN environment variable')
        process.exit(1)
    }
}

async function getToken(email) {
    try {
        const res = await axios.get(urls.token + email)
        return res.data.token
    } catch (err) {
        console.error('Error when getting the token: ', err.message)
        process.exit(1)
    }
}

async function getBlocks() {
    checkToken(TOKEN)

    try {
        const res = await axios.get(urls.blocks + '?token=' + TOKEN)
        return res.data
    } catch (err) {
        console.error('Error when getting the blocks: ', err.message)
        process.exit(1)
    }
}

// check if chunk1 and chunk2 are contiguous and in order (chunk1->chunk2)
async function checkContiguous(chunk1, chunk2) {
    checkToken(TOKEN)
    if (!chunk1 || typeof chunk1 !== 'string'
        || !chunk2 || typeof chunk2 !== 'string') {
        throw new Error('Two string chunks should be provided')
    }

    try {
        const res = await axios.post(
            urls.check + '?token=' + TOKEN,
            { blocks: [chunk1, chunk2] }
        )
        const isContiguous = res.data.message === true
        process.stdout.write(isContiguous ? "|" : ".")
        return isContiguous
    } catch (err) {
        console.error('Error when checking blocks contiguity: ', err.message)
        process.exit(1)
    }
}

async function checkSolution(stringifiedSolution) {
    checkToken(TOKEN)
    if (!stringifiedSolution || typeof stringifiedSolution !== 'string') {
        throw new Error('A solution string should be provided')
    }

    try {
        const res = await axios.post(
            urls.check + '?token=' + TOKEN,
            { encoded: stringifiedSolution }
        )
        const isCorrect = res.data.message === true
        return isCorrect
    } catch (err) {
        console.error('Error when checking blocks contiguity: ', err.message)
        process.exit(1)
    }
}

module.exports = {
    getToken,
    getBlocks,
    checkContiguous,
    checkSolution,
}
