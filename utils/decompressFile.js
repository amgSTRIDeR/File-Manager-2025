import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import logColoredMessage from '../../node-nodejs-basics/src/common/colors.js';
import { isFile } from './is-file.js';
import { isDirectory } from './is-directory.js';

export default async function decompressFile(currentDirectory, inputFilePath, destinationPath) {
    try {
        let resolvedPathToFile = path.resolve(currentDirectory, inputFilePath);
        if (await isFile(inputFilePath)) {
            resolvedPathToFile = inputFilePath;
        }

        let resolvedDestinationPath = path.resolve(currentDirectory, destinationPath);
        if (await isDirectory(destinationPath)) {
            resolvedDestinationPath = destinationPath;
        }

        const resolvedDestinationFile = path.resolve(resolvedDestinationPath, path.basename(resolvedPathToFile).slice(0, -3));

        if (await isFile(resolvedDestinationFile)) {
             logColoredMessage('Invalid input', 'red');
            return;
        }

        if (!(await isFile(resolvedPathToFile))) {
             logColoredMessage('Invalid input', 'red');
            return;
        }

        const readStream = fs.createReadStream(resolvedPathToFile);
        const writeStream = fs.createWriteStream(resolvedDestinationFile);

        const brotliStream = zlib.createBrotliDecompress();

        readStream.pipe(brotliStream).pipe(writeStream);

        const fileCompressed = new Promise((resolve, reject) => {

            writeStream.on('finish', () => {
                resolve();
            });

            writeStream.on('error', () => {
                reject();
            });
        });

        await fileCompressed;
        logColoredMessage(`File ${resolvedPathToFile} decompressed to ${resolvedDestinationFile}`, 'yellow');

    } catch {
         logColoredMessage('Invalid input', 'red');
    }
}
