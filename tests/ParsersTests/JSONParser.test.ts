import { parseJSON } from '../../src/parsers/jsonParser';
import fs from 'fs';
import path from 'path';
import { createParserFile } from './UtilFunction';

describe("json parser:", ()=>{
    it('should parse json file correctly', async () => {
        const filePath = path.join(__dirname, "..", "..", "src", "data", "book orders.json");
        const data = await parseJSON(filePath);

        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0); // Ensure that some data is 
        const firstItem = data[0];
        expect(firstItem).toHaveProperty('Order ID');
        expect(firstItem).toHaveProperty('Quantity');

    });
    it('should throw an error if non-existent json file', async () => {
        const filePath = './src/data/non_existent.json'; // Non-existent file
        await expect(parseJSON(filePath)).rejects.toThrow(); // Expect an error to be thrown
    });
    it('should handle malformed json data', async () => {
      //create a malformed JSON file for testing
        const malformedJsonFilePath= await createParserFile('malformed.json', '{ "Order ID": 1, "Book Title": "Test Book", ');

        await expect(parseJSON(malformedJsonFilePath)).rejects.toThrow(); // Expect an error to be thrown for malformed data
    });
    it('should handle empty json file', async () => {
        // Create an empty JSON file for testing
        const emptyJsonFilePath = await createParserFile('empty.json', ''); 
        const data = await parseJSON(emptyJsonFilePath);

        expect(data).toBeDefined();
        expect(data).toEqual([]); // Expect an empty object for an empty JSON file
    });
    it('should parse boolean json', async () => {
  const filePath = await createParserFile('boolean.json', 'true');
  const data = await parseJSON(filePath);
  expect(data).toBe(true);
});

it('should parse string json', async () => {
  const filePath = await createParserFile('string.json', '"hello"');
  const data = await parseJSON(filePath);
  expect(data).toBe("hello");
});

it('should parse number json', async () => {
  const filePath = await createParserFile('number.json', '42');
  const data = await parseJSON(filePath);
  expect(data).toBe(42);
});

it('should parse null json', async () => {
  const filePath = await createParserFile('null.json', 'null');
  const data = await parseJSON(filePath);
  expect(data).toBe(null);
});
 afterAll(() => {
    // Clean up the directory containing dummy files creates during tests.
    const dummyFilesDir = path.resolve(__dirname, './dummyJSONFiles');
    if (fs.existsSync(dummyFilesDir)) {
        fs.rmSync(dummyFilesDir, { recursive: true, force: true });
    }
});
});
