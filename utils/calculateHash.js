
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { isFile } from './is-file.js';
import logColoredMessage from "../common/colors.js";


export default async function calculateHash(currentDirectory, pathToFile) {
    try {

        const normalizedFilePath = path.normalize(pathToFile);
        let resolvedPathToFile = path.resolve(currentDirectory, normalizedFilePath);
        if (await isFile(normalizedFilePath)) {
            resolvedPathToFile = normalizedFilePath;
        }

        const readStream = fs.createReadStream(resolvedPathToFile);
        const hash = crypto.createHash('sha256');
        const hashPromise = new Promise((resolve, reject) => {
            readStream.on('data', (chunk) => {
                hash.update(chunk);
            });
            readStream.on('end', () => {
                resolve(hash.digest('hex'));
            });
            readStream.on('error', (error) => {
                reject(error);
            });

        });

        const fileHash = await hashPromise;

        logColoredMessage(`File hash is: ${fileHash}`, 'yellow');
    } catch {
        logColoredMessage('Invalid input', 'red');
    }

}

