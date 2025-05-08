import path from 'path';
import fs from 'fs';
import logColoredMessage from "../common/colors.js";


export default async function createFile(currentPath, fileName) {
    const filePath = path.resolve(currentPath, fileName);

    try {
        await fs.promises.writeFile(filePath, '', { flag: 'wx' });
        logColoredMessage(`File ${fileName} created`, 'yellow');
    } catch (err) {
        logColoredMessage(`Invalid input`, 'red');
    }
}