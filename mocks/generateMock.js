function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m > 1) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        if (i === 0) {
            i = 1
        }

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function generateChunk(chunkSize) {
    // for chunks of 8 letters this works fine.
    return Math.random().toString(36).slice(2, 2 + chunkSize)
}

function generateMock({ chunkSize, numberOfChunks }) {
    if (chunkSize > 8) {
        throw new Error('Chunk Size should be 8 or less')
    }
    let chunks = new Set()
    let original = []
    for (let i = 0; i < numberOfChunks; i++) {
        let newChunk = generateChunk(chunkSize)
        // avoid duplicates
        if (chunks.has(newChunk)) {
            i--;
            continue;
        } else {
            chunks.add(newChunk, true)
            original.push(newChunk)
        }
    }
    let shuffled = shuffle([].concat(original))
    return {
        shuffled,
        original
    }
}

module.exports = generateMock