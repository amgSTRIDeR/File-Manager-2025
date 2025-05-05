import logColoredMessage from "../../node-nodejs-basics/src/common/colors.js";
import os from "os";
import toUpperDirectory from "../utils/to-upper-directory.js";
import { changeDirectory } from "../utils/change-directory.js";
import list from "../utils/list.js";

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