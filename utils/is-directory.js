import fs from 'fs';

export async function isDirectory(pathToCheck) {
    try {
        const pathStat = await fs.promises.stat(pathToCheck);
        if(pathStat.isDirectory()) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}