const { getBlocks, checkSolution } = require("./api")
const { check } = require("./check")

async function sortBlocks() {
    const blocks = await getBlocks()
    console.log("blocks", blocks)
    const sortResult = await check(blocks.data)
    const solution = sortResult.solution
    console.log("\nsolution", solution)
    const checkResult = await checkSolution(solution.join(''))
    console.log("-".repeat(40))
    console.log("The solution check result is ", checkResult ? 'CORRECT ✔️' : "INCORRECT ❌")
}

module.exports = sortBlocks