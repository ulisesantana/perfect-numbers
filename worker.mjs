import { parentPort, workerData } from 'worker_threads';
import { isPerfectNumber } from './perfect-number.mjs';

const { start, end } = workerData;
const perfectNumbers = [];

for (let i = start; i <= end; i++) {
    if (isPerfectNumber(i)) {
        perfectNumbers.push(i);
    }
}

parentPort.postMessage(perfectNumbers);
