import fs from 'fs';
import logColoredMessage from '../../node-nodejs-basics/src/common/colors.js';
import { isDirectory } from './is-directory.js';
import { isFile } from './is-file.js';

function sortByName(a, b) {
    return a.Name.localeCompare(b.Name);
}

export default async function list(currentDirectory) {
    try {
        const contents = await fs.promises.readdir(currentDirectory);

        const directories = [];
        const files = [];

        for (const content of contents) {
            const contentPath = `${currentDirectory}/${content}`;
            if (await isDirectory(contentPath)) {
                directories.push({ Name: content, Type: 'directory' });
            }

            if (await isFile(contentPath)) {
                files.push({ Name: content, Type: 'file' });
            }
        }

        directories.sort(sortByName);
        files.sort(sortByName);

        const allContents = directories.concat(files);

        console.table(allContents);

    } catch (err) {
        logColoredMessage(err, 'red');
        logColoredMessage('Operation failed', 'red');
    }
}