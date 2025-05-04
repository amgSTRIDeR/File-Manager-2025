import path from 'path';
import logColoredMessage from '../../node-nodejs-basics/src/common/colors.js';

export default function toUpperDirectory(currentDirectory) {
    try {
                const newDirectory = currentDirectory.split(path.sep).slice(0, -1).join(path.sep);
                return newDirectory;
    } catch {
        logColoredMessage('Operation failed', 'red');
        return currentDirectory;
    }

}