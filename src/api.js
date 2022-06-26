require('dotenv').config();
const axios = require('axios')

const EMAIL = process.env.EMAIL
const TOKEN = process.env.TOKEN

// TODO: use typescript and remove typechecking code

const urls = {
    token: "https://rooftop-career-switch.herokuapp.com/token?email=" + EMAIL,
    blocks: "https://rooftop-career-switch.herokuapp.com/blocks",
    check: "https://rooftop-career-switch.herokuapp.com/check",
}

async function getToken() {
    try {
        const res = await axios.get(urls.token)
        return res.data.token
    } catch (err) {
        console.error('Error when getting the token: ', err)
        throw err
    }
}

async function getBlocks() {
    if (!TOKEN || typeof TOKEN !== 'string') {
        throw new Error('Token should be provided')
    }
    try {
        const res = await axios.get(urls.blocks + '?token=' + TOKEN)
        return res.data
    } catch (err) {
        console.error('Error when getting the blocks: ', err)
        throw err
    }
}

// check if chunk1 and chunk2 are contiguous and in order (chunk1->chunk2)
async function checkContiguous(chunk1, chunk2) {
    if (!TOKEN || typeof TOKEN !== 'string') {
        throw new Error('Token should be provided')
    }
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
        console.error('Error when checking blocks contiguity: ', err)
        throw err
    }
}

async function checkSolution(stringifiedSolution) {
    if (!TOKEN || typeof TOKEN !== 'string') {
        throw new Error('Token should be provided')
    }
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
        console.error('Error when checking blocks contiguity: ', err)
        throw err
    }
}

module.exports = {
    getToken,
    getBlocks,
    checkContiguous,
    checkSolution,
}
