const { check } = require('../src/check')
const generateMock = require('../mocks/generateMock');
const { statistics } = require('./util');

// mocking check function.
// using outside variable to replace the mock which to compare
const SIMULATED_RESPONSE_MS = 0
let mockedStringified = ''
jest.mock('../src/api', () => ({
    checkContiguous: async (str1, str2) => {
        await new Promise(r => setTimeout(r, SIMULATED_RESPONSE_MS));
        return mockedStringified.includes(str1 + str2)
    },
}));

// mocks setup
const CHUNK_SIZE = 8
const NUMBER_OF_CHUNKS = 10
const NUMBER_OF_MOCKS = 4
const testCases = []
for (let i = 0; i < NUMBER_OF_MOCKS; i++) {
    testCases.push(generateMock({
        chunkSize: CHUNK_SIZE,
        numberOfChunks: NUMBER_OF_CHUNKS
    }))
}

// performance statistics
let performance = {
    numberChunks: NUMBER_OF_CHUNKS,
    numberChunksSquared: NUMBER_OF_CHUNKS * NUMBER_OF_CHUNKS,
}

describe("check fn tests", () => {
    test.each(testCases)("Generated mock test:#%# - Success", async (blocks) => {
        mockedStringified = blocks.original.join('')
        let result = await check(blocks.shuffled)
        statistics(performance, 'comparisons', result.comparisons)

        expect(result.solution.join('')).toBe(blocks.original.join(''))
        expect(result.solution.join('')).not.toBe(blocks.shuffled.join(''))
    })

    test("Manual mock testcase - Success", async () => {
        const shuffled = [
            's3z1am59', 'x1iiuxx9',
            'zylil021', 'lqe89hjw',
            'o812oqez', 'gpfw940u',
            'g8kelzhe', 'wtk6pudv',
            'bipxo8a6', 'b5fq9pz1',
        ]
        const originalString = 's3z1am59b5fq9pz1lqe89hjwzylil021x1iiuxx9wtk6pudvbipxo8a6o812oqezgpfw940ug8kelzhe'
        const shuffledString = 's3z1am59x1iiuxx9zylil021lqe89hjwo812oqezgpfw940ug8kelzhewtk6pudvbipxo8a6b5fq9pz1'

        mockedStringified = originalString
        let result = await check(shuffled)
        // original
        expect(result.solution.join('')).toBe(originalString)
        expect(result.solution.join('')).not.toBe(shuffledString)
    })

    afterAll(() => {
        console.log("🚀 performance 🚀", performance)
    })
})
