import logColoredMessage from "../../node-nodejs-basics/src/common/colors.js";
import os from "os";
import toUpperDirectory from "../utils/to-upper-directory.js";
import { changeDirectory } from "../utils/change-directory.js";
import list from "../utils/list.js";
import showFileContent from "../utils/showFileContent.js";
import createFile from "../utils/createFile.js";
import createFolder from "../utils/createFolder.js";
import renameFile from "../utils/renameFile.js";
import copyFile from "../utils/copyFile.js";
import removeFile from "../utils/removeFile.js";

const fileManager = async () => {
    const argsArray = (process.argv).slice(2);
    const userName = argsArray.find((arg) => arg.startsWith('--username'))?.split('=')[1] || 'guest';
    const homeDir = os.homedir()
    let currentDir = homeDir;
    logColoredMessage(`Welcome to the File Manager, ${userName}!`, 'magenta');
    logColoredMessage(`You are currently in ${currentDir}`, 'green');

    process.stdin.on('data', async (chunk) => {
        const input = chunk.toString().trim().split(' ');
        const command = input[0];
        const options = input.slice(1);

        switch (command) {

            case ('up'):
                if (currentDir === homeDir) {
                    logColoredMessage(`\nAlready in home directory: ${currentDir}`, 'red');
                } else {
                    currentDir = toUpperDirectory(currentDir);
                }
                break;
            case ('cd'):
                if (options[0]) {
                    currentDir = await changeDirectory(currentDir, options[0]);
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('ls'):
                await list(currentDir);
                break;
            case ('cat'):
                if (options[0]) {
                    await showFileContent(currentDir, options[0]);
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('add'):
                if (options[0]) {
                    await createFile(currentDir, options[0]);
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('mkdir'):
                if (options[0]) {
                    await createFolder(currentDir, options[0]);
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('rn'):
                if (options[0] && options[1]) {
                    await renameFile(currentDir, options[0], options[1]);
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('cp'):
                if (options[0] && options[1]) {
                    await copyFile(currentDir, options[0], options[1]);
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('mv'):
                if (options[0] && options[1]) {
                    await copyFile(currentDir, options[0], options[1], { deleteSource: true });
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('rm'):
                if (options[0]) {
                    await removeFile(currentDir, options[0]);
                } else {
                    logColoredMessage(`Invalid input`, 'red');
                }
                break;
            case ('.exit'):
                process.exit();
            default:
                logColoredMessage(`Invalid input`, 'red');
        }
        logColoredMessage(`\nYou are currently in ${currentDir}`, 'green');
    })



    process.on('SIGINT', () => {
        process.exit();
    });

    process.on('exit', () => {
        logColoredMessage(`Thank you for using File Manager, ${userName}, goodbye!`, 'magenta');
    });

};

await fileManager();