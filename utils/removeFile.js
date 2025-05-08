
import path from 'path';
import fs from 'fs';
import logColoredMessage from "../common/colors.js";
import { isFile } from './is-file.js';

export default async function removeFile(currentDirectory, pathToFile) {
    let resolvedPathToFile = path.resolve(currentDirectory, pathToFile);
    if (await isFile(pathToFile)) {
        resolvedPathToFile = pathToFile;
    }

    try {
        await fs.promises.unlink(resolvedPathToFile);
        logColoredMessage(`File ${pathToFile} removed`, 'yellow');
    } catch {
        logColoredMessage('Operation failed', 'red');
    }

}
