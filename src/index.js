import logColoredMessage from "../../node-nodejs-basics/src/common/colors.js";


const fileManager = async () => {
    const argsArray = (process.argv).slice(2);
    const userName = argsArray.find((arg) => arg.startsWith('--username'))?.split('=')[1] || 'guest';
    logColoredMessage(`Welcome to the File Manager, ${userName}!`, 'magenta');

    process.stdin.on('data', (chunk) => {
        const command = chunk.toString().trim();

        if(command === '.exit') {
            process.exit();
        }
    })



    process.on('SIGINT', () => {
        process.exit();
    });

    process.on('exit', () => {
        logColoredMessage(`Thank you for using File Manager, ${userName}, goodbye!`, 'magenta');
    });

};

await fileManager();