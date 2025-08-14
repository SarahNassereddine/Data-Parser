import { promises as fs } from 'fs';
import * as path from 'path';

const DUMMY_FILES_DIR = path.resolve(__dirname, './dummyFiles');

/**
 * Creates a file with the given name and content in the dummyFiles folder.
 * @param fileName Name of the file to create.
 * @param content Content to write to the file.
 * @returns The full path of the created file.
 */
export async function createParserFile(fileName: string, content: string): Promise<string> {
    const filePath = path.join(DUMMY_FILES_DIR, fileName);
    await fs.mkdir(DUMMY_FILES_DIR, { recursive: true });
    try {
        await fs.access(filePath);
        // File exists, do not create again
        return filePath;
    } catch (err) {
        // File does not exist, continue to create
    }
    await fs.writeFile(filePath, content, 'utf8');
    return filePath;
}