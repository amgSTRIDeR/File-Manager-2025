
import path from 'path';
import logColoredMessage from "../common/colors.js";
import fs from 'fs';
import { isFile } from './is-file.js';
import { isDirectory } from './is-directory.js';


export default async function copyFile(currentDirectory, pathToFile, destinationDirectory, options = { deleteSource: false }) {
    try {
        const normalizedFilePath = path.normalize(pathToFile);
        let resolvedPathToFile = path.resolve(currentDirectory, normalizedFilePath);
        if (await isFile(normalizedFilePath)) {
            resolvedPathToFile = normalizedFilePath;
        }


        const normalizedDirectoryPath = path.normalize(destinationDirectory);
        let resolvedPathToDirectory = path.resolve(currentDirectory, normalizedDirectoryPath);
        if (await isDirectory(normalizedDirectoryPath)) {
            resolvedPathToDirectory = normalizedDirectoryPath;
        }
        const parsedFilePath = path.parse(resolvedPathToFile);
        const destinationFilePath = path.resolve(resolvedPathToDirectory, parsedFilePath.base);

        const isOriginalFileExist = await isFile(resolvedPathToFile);
        const isDirectoryExist = await isDirectory(resolvedPathToDirectory);
        const isDestinationFileExist = await isFile(destinationFilePath);
        if (!isOriginalFileExist || !isDirectoryExist || isDestinationFileExist) {
            logColoredMessage(`Invalid input`, 'red');
            return;
        }

        const readStream = fs.createReadStream(resolvedPathToFile);
        const writeStream = fs.createWriteStream(destinationFilePath);
        readStream.pipe(writeStream);
        const copyPromise = new Promise((resolve, reject) => {
            readStream.on('end', () => {
                resolve();
            })
        });

        await copyPromise;
        if (options.deleteSource) {
            fs.promises.unlink(resolvedPathToFile);
        }
        logColoredMessage(`File ${resolvedPathToFile} copied to ${resolvedPathToDirectory}`, 'yellow');
    } catch (err) {
        logColoredMessage(`Invalid input`, 'red');
    }
}