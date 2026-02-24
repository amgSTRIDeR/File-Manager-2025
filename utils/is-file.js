import fs from 'fs';

export async function isFile(pathToCheck) {
    try {
        const pathStat = await fs.promises.stat(pathToCheck);
        if(pathStat.isFile()) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}