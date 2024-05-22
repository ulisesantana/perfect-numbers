import {writeFile, unlink} from 'fs/promises';
import {Worker} from 'worker_threads';
import {parseArgs} from "./parse-args.mjs";

const {limit, workers} = parseArgs(process.argv);

const computePerfectNumbersLabel = 'Compute perfect numbers';
const fleje = BigInt(limit);
const filePath = `./perfect-number-${fleje}.txt`;
const rangeSize = fleje / BigInt(workers);
const workerPromises = [];

await unlink(filePath).catch(() => {});

console.log(`Searching for perfect numbers below ${fleje} with ${workers} workers.`,)
console.time(computePerfectNumbersLabel)
for (let i = 0; i < workers; i++) {
    const start = rangeSize * BigInt(i) + 1n;
    const end = (i === workers - 1) ? fleje : rangeSize * BigInt(i + 1);

    workerPromises.push(runWorker({start, end}));
}

try {
    const results = await Promise.all(workerPromises);
    await writeFile(
        filePath,
        results.flat().sort((a, b) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0
        }).join(`\n`) + '\n',
        {flag: 'a+'}
    )
    console.timeEnd(computePerfectNumbersLabel)
    console.log('Finished processing.');
} catch (err) {
    console.error('Error:', err);
}

/**
 * Run worker thread
 *
 * @param {Object} workerData
 * @param {BigInt} workerData.start
 * @param {BigInt} workerData.end
 * @returns {Promise<BigInt[]>}
 */
function runWorker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.mjs', {workerData});

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
