import path from 'path';
import fs from 'fs';
import logColoredMessage from '../../node-nodejs-basics/src/common/colors.js';


export default async function createFolder(currentPath, folderName) {
    const folderPath = path.resolve(currentPath, folderName);

    try {
        await fs.promises.mkdir(folderPath);
        logColoredMessage(`Folder ${folderPath} created`, 'yellow');
    } catch (err) {
        logColoredMessage(`Invalid input`, 'red');
    }
}