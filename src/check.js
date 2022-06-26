const { checkContiguous } = require("./api")

async function check(blocks) {
    const arr = [].concat(blocks)
    const len = blocks.length
    let comparisons = 0
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            // console.log("🚀 ~ i, j, len", i, j, len)
            comparisons++
            const isContiguous = await checkContiguous(arr[i], arr[j])
            if (isContiguous) {
                if (j !== i + 1) { // not need to swap if in order
                    temp = arr[j];
                    arr[j] = arr[i + 1];
                    arr[i + 1] = temp;
                }
                break
            }
        }
    }
    return {
        comparisons,
        solution: arr,
    }
}

module.exports = {
    check
}
