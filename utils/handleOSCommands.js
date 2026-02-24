import os from 'os';
import logColoredMessage from "../common/colors.js";

export default function handleOSCommands(arg) {
    const command = arg.slice(2);
    switch (command) {
        case 'EOL':
            const eol = os.EOL;
            logColoredMessage(`The end of a line in the current OS is: ${JSON.stringify(eol)}`, 'yellow');
            break;
        case 'cpus':
            const cpus = os.cpus();
            logColoredMessage(`The number of CPUs is: ${cpus.length}`, 'yellow');
            logColoredMessage(`The model of the CPU is: ${cpus[0].model}`, 'yellow');
            logColoredMessage(`The clock rate of the CPU is: ${(cpus[0].speed/1000).toFixed(2)} GHz`, 'yellow');
            break;
        case 'homedir':
            const homedir = os.homedir();
            logColoredMessage(`The home directory is: ${homedir}`, 'yellow');
            break;
        case 'username':
            const username = os.userInfo().username;
            logColoredMessage(`The current system username is: ${username}`, 'yellow');
            break;
        case 'architecture':
            const architecture = os.arch();
            logColoredMessage(`The architecture is: ${architecture}`, 'yellow');
            break;
        default:
            logColoredMessage('Invalid input', 'red');
    }
}