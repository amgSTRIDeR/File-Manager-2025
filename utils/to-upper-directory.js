import path from 'path';
import logColoredMessage from "../common/colors.js";

export default function toUpperDirectory(currentDirectory) {
    try {
        const directoriesArray = currentDirectory.split(path.sep);
        if (directoriesArray.length === 1) {
            return currentDirectory;
        }
        const newDirectory = directoriesArray.slice(0, -1).join(path.sep);
        return newDirectory;
    } catch (err) {
        logColoredMessage(err, 'red');
        logColoredMessage('Operation failed', 'red');
        return currentDirectory;
    }

}