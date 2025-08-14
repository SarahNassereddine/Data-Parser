import { parseCSV } from '../../src/parsers/csvParser';
import fs from 'fs';
import path from 'path';
import { createParserFile } from './UtilFunction';


describe('CSV Parser: ', () => {
    const dummyFilesDir = path.resolve(__dirname, './dummyCSVFiles');
    it('should parse CSV file correctly', async () => {
        const filePath = path.join(__dirname, '..',"..", 'src', 'data', 'Cake orders.csv'); 
        const data = await parseCSV(filePath);
        
        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is parsed an file is not empty
        expect(data[0]).toEqual(expect.arrayContaining(["id", "Type", "Flavor", "Filling", "Size", "Layers", "Frosting Type", "Frosting Flavor", "Decoration Color"])); // Check headers
    });
    it('should handle empty CSV file', async () => {
        // Create an empty CSV file for testing
        const emptyCSVFilePath = await createParserFile(dummyFilesDir,'empty.csv', '');
        const data = await parseCSV(emptyCSVFilePath);

        expect(data).toBeDefined();
        expect(data.length).toBe(0); // Expect no data in an empty file
    });
    it('should throw error if non-existent CSV file', async () => {
        const filePath = './src/data/non_existent.csv'; // Non-existent file
        await expect(parseCSV(filePath)).rejects.toThrow(); // Expect an error to be thrown
    });

    it ('should handle spaces and empty lines', async () => {
        // Create a CSV file with spaces and empty lines
        const spacesAndEmptyLinesFilePath = await createParserFile(dummyFilesDir,'spaces_and_empty_lines.csv', 'name,age\n\nJohn,30\n  \nJane,25\n'); // Create a CSV file with spaces and empty lines
        const data = await parseCSV(spacesAndEmptyLinesFilePath);

        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is parsed
    });
    it("should escape delimitters ',' if they are part of the content", async () => {
        // Create a CSV file with delimiter vs content
        const delimiterVsContentFilePath = await createParserFile(dummyFilesDir,'delimiter_vs_content.csv', 'name,  age, "sarah, ss",20'); // Create a CSV file with delimiter vs content
        const data = await parseCSV(delimiterVsContentFilePath);

        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is parsed
    });
     afterAll(() => {
        // Clean up the directory containing dummy files creates during tests.
        
        if (fs.existsSync(dummyFilesDir)) {
            fs.rmSync(dummyFilesDir, { recursive: true, force: true });
        }});
});