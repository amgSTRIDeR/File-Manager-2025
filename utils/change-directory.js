import path from 'path';
import logColoredMessage from '../../node-nodejs-basics/src/common/colors.js';
import { isDirectory } from './is-directory.js';

export async function changeDirectory(currentDirectory, destinationDirectory) {
    const relativePath = path.join(currentDirectory, destinationDirectory);

    try {
        const isRelativePath = await isDirectory(relativePath);
        const isAbsolutePath = await isDirectory(destinationDirectory);

        if (isRelativePath) {
            return relativePath;
        }

        if (isAbsolutePath) {
            return destinationDirectory;
        } else {
            throw new Error("Path doesn't exist");
        }
    } catch (err) {
        logColoredMessage(err, 'red');
        logColoredMessage('Operation failed', 'red');
        return currentDirectory;
    }
}