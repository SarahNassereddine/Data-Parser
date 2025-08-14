import { parseXml } from '../../src/parsers/xmlParser';
import fs from 'fs';
import path from 'path';
import { createParserFile } from './UtilFunctions';

describe("XML parser:", () => {
    it("should parse XML file correctly", async () => {
        const filePath = path.join(__dirname, "..", "..", "src", "data", "toy orders.xml");
        const fileData = await parseXml(filePath);

        expect(fileData).toBeDefined();
        expect(fileData.data).toBeDefined();
        expect(fileData.data.row[0].OrderID).toBeDefined();
        expect(fileData.data.row[0].Quantity).toBeDefined();

    });

    it("should handle empty XML file", async () => {
        // Create an empty XML file for testing
        const emptyXmlFilePath = await createParserFile('empty.xml', '');
        const data = await parseXml(emptyXmlFilePath);

        expect(data).toBeDefined();
        expect(typeof data).toBe("object");
    });

    it("should thhrow an error if non-existent XML file", async () => {
        const filePath = './src/data/non_existent.xml'; // Non-existent file
        await expect(parseXml(filePath)).rejects.toThrow(/Failed to parse XML/); // Expect an error to be thrown
    });

    it("should handle malformed XML data", async () => {
        // Create a malformed XML file for testing
        const malformedXmlFilePath = await createParserFile('malformed.xml', '<toyOrders><order><id>1</id><name>Test Toy</name></order>');
        await expect(parseXml(malformedXmlFilePath)).rejects.toThrow(); // Expect an error to be thrown for malformed data
    });
    afterAll(() => {
        // Clean up the directory containing dummy files creates during tests.
        const dummyFilesDir = path.resolve(__dirname, './dummyXMLFiles');
        if (fs.existsSync(dummyFilesDir)) {
            fs.rmSync(dummyFilesDir, { recursive: true, force: true });
        }});
});