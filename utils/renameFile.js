import fs from 'fs';
import logColoredMessage from "../common/colors.js";
import path from 'path';
import { isFile } from './is-file.js';

export default async function renameFile(currentDirectory, pathToFile, newFilename) {
    const normalizedPathToFile = path.normalize(pathToFile);
    const isPathCorrect = await isFile(normalizedPathToFile);
    let pathToFileResolved = path.resolve(currentDirectory, pathToFile);

    if (isPathCorrect) {
        pathToFileResolved = pathToFile;
    }

    const parsedPath = path.parse(pathToFileResolved);
    parsedPath.base = newFilename;
    const pathToRenamedFile = path.format(parsedPath);

    try {
        await fs.promises.rename(pathToFileResolved, pathToRenamedFile);
        logColoredMessage(`File ${pathToFile} renamed to ${newFilename}`, 'yellow') 
    } catch (err) {
            logColoredMessage(`Invalid input`, 'red');
    }
}