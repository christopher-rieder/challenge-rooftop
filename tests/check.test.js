const { check } = require('../src/check')
const generateMock = require('../mocks/generateMock');

// mocking check function.
// using outside variable to replace the mock which to compare
let mockedStringified = ''
jest.mock('../src/api', () => ({
    checkContiguous: (str1, str2) => {
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

describe("check fn tests", () => {
    test.each(testCases)("Happy Path with generated mock #%#", async (blocks) => {
        mockedStringified = blocks.original.join('')
        let result = await check(blocks.shuffled)

        expect(result.join('')).toBe(blocks.original.join(''))
        expect(result.join('')).not.toBe(blocks.shuffled.join(''))
    })

    test("Happy Path with manual mock", async () => {
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
        expect(result.join('')).toBe(originalString)
        expect(result.join('')).not.toBe(shuffledString)
    })

    test('Blocks with duplicates should output a warning', async () => {
        // this array has duplicates, making the algorithm non-deterministic.
        // also, in this particular case, the algorithm result will be incorrect.
        const shuffled = [
            'vgb', '4c6', '1em', 'obb',
            '0s5', 's15', '34m', '4yu',
            'xxs', '9qi', 'ai7', 'xat',
            'v89', '23b', 'ls9', 'ema',
            'mbk', 'ryu', 'hpl', 'ml9',
            'm43', 'edb', 'jsr', 'rt1',
            'ja5', 'r82', '8en', 'zon', // 8en duplicate
            'n75', '8en', 'o1z', 'dyh'  // 8en duplicate
        ]

        mockedStringified = "vgb8enrt123bemar82ja5jsrls9o1zv89xat4c6ryu34mdyh1emedbs15obbml9n75xxs4yuai7mbk9qi8enhplzonm430s5"

        jest.spyOn(console, 'warn').mockImplementation(() => { });
        let result = await check(shuffled)

        // we take the shot to see if it's correct or not
        let resultString = result.join('')

        // at least we should have the same length
        expect(resultString.length).toBe(mockedStringified.length)

        // for this testcase this would be false
        // expect(resultString).toBe(mockedStringified)

        expect(console.warn).toHaveBeenCalled()
        expect(console.warn).toHaveBeenCalledWith(expect.stringMatching('Next block not found.'))
        console.warn.mockRestore();
    })
})
