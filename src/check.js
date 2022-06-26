const { checkContiguous } = require("./api")

async function check(blocks) {
    const arr = [].concat(blocks)
    const len = blocks.length
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            const isContiguous = await checkContiguous(arr[i], arr[j])
            if (isContiguous) {
                // move j to the position arr[i+1] (next to arr[i])
                temp = arr[j];
                arr[j] = arr[i + 1];
                arr[i + 1] = temp;
                break
            }

            // next block not found. Non-deterministic behaviour.
            // at this point the next block should have been found.
            // correctness cannot be ensured.
            // the blocks provided may have duplicates.
            if (!isContiguous && j === len - 1) {
                console.warn("Next block not found.\nCorrectness cannot be ensured.\nThere may be non-deterministic behaviour\nCheck blocks for duplicates.")
            }
        }
    }
    return arr
}

module.exports = {
    check
}
