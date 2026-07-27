import { parseJSON } from '../../src/parsers/jsonParser';
import fs from 'fs';
import path from 'path';
import { createParserFile } from './UtilFunction';

describe("json parser:", ()=>{
   const dummyFilesDir = path.resolve(__dirname, './dummyJSONFiles');
    it('should parse json file correctly', async () => {
    const filePath = await createParserFile(
        dummyFilesDir,
        'books.json',
        JSON.stringify([{
            'Order ID': '2001',
            'Book Title': 'Edge of Eternity',
            'Author': 'Dan Brown',
            'Genre': 'Science Fiction',
            'Format': 'Paperback',
            'Language': 'French',
            'Publisher': 'Oxford Press',
            'Special Edition': 'Signed Copy',
            'Packaging': 'Eco-Friendly Packaging',
            'Price': '12',
            'Quantity': '5'
        }])
    );

    const data = await parseJSON(filePath);

        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is 
        const firstItem = data[0];
        expect(firstItem).toHaveProperty('Order ID');
        expect(firstItem).toHaveProperty('Quantity');

        expect(firstItem['Order ID']).toBe('2001');
        expect(firstItem['Price']).toBe('12');

    });
    it('should throw an error if non-existent json file', async () => {
        const filePath = './src/data/non_existent.json'; // Non-existent file
        await expect(parseJSON(filePath)).rejects.toThrow(); // Expect an error to be thrown
    });
    it('should throw an error if malformed json data', async () => {
      //create a malformed JSON file for testing
        const malformedJsonFilePath= await createParserFile(dummyFilesDir,'malformed.json', '{ "Order ID": 1, "Book Title": "Test Book", ');

        await expect(parseJSON(malformedJsonFilePath)).rejects.toThrow(); // Expect an error to be thrown for malformed data
    });
    it('should handle empty json file', async () => {
        // Create an empty JSON file for testing
        const emptyJsonFilePath = await createParserFile(dummyFilesDir,'empty.json', ''); 
        const data = await parseJSON(emptyJsonFilePath);

        expect(data).toBeDefined();
        expect(data).toEqual([]); // Expect an empty array for an empty JSON file
    });
 afterAll(() => {
    // Clean up the directory containing dummy files creates during tests.
  
    if (fs.existsSync(dummyFilesDir)) {
        fs.rmSync(dummyFilesDir, { recursive: true, force: true });
    }
});
});
