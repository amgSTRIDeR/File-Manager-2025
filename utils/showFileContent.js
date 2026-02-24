

import path from 'path';
import fs from 'fs';
import logColoredMessage from "../common/colors.js";
import { isFile } from './is-file.js';

export default async function showFileContent(currentPath, targetPath) {
    const filePath = path.resolve(currentPath, targetPath);
    const notFile = !(await isFile(filePath));

    if (notFile) {
        logColoredMessage(`${targetPath} is not a file`, 'red');
        logColoredMessage(`Invalid input`, 'red');
        return;
    }
    try {
        const readable = fs.createReadStream(filePath, 'utf-8');
        const fileContentPromise = new Promise((resolve, reject) => {
            let fileContent = '';

            readable.on('data', (chunk) => {
                fileContent += chunk;
            });

            readable.on('end', () => {
                resolve(fileContent);
            });

            readable.on('error', (error) => {
                reject(error);
            });
        });

        const fileContent = await fileContentPromise;
        logColoredMessage(fileContent, 'yellow');
    } catch {
        logColoredMessage(`Invalid input`, 'red');
    }
}