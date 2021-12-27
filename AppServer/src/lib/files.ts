import path from 'path';
import fs from 'fs-extra';

export const unlinkAllFiles = async (dirname: string) => {
    const directory = path.resolve(dirname);
    if (directory) {
        fs.readdir(directory, (error, files) => {
            for (const file of files) {
                fs.unlink(path.join(directory, file));
            }
        });
    }
}

export const unlinkFile = async (filepath: string) => {
    const file: boolean = fs.existsSync(path.resolve(filepath));
    if (file) {
        await fs.unlink(path.resolve(filepath));
    }
}