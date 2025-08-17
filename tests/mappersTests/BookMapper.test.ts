import {JSONBookMapper} from "../../src/mappers/Book.mapper"
import { BookBuilder } from "../../src/model/builders/Book.builder";

describe('JSONBookMapper', () => {
    let mapper: JSONBookMapper;
    beforeAll(()=>{
        mapper = new JSONBookMapper();
    })
    describe('map()', () => {
    it('should map json book object to js object correctly', () => {
        const jsonData = {
        "Book Title": "Edge of Eternity",
        "Author": "Dan Brown",
        "Genre": "Science Fiction",
        "Format": "Paperback",
        "Language": "French",
        "Publisher": "Oxford Press",
        "Special Edition": "Signed Copy",
        "Packaging": "Eco-Friendly Packaging",
    };

        const expectedJSData = BookBuilder.newBuilder()
            .setBookTitle("Edge of Eternity")
            .setAuthor("Dan Brown")
            .setGenre("Science Fiction")
            .setFormat("Paperback")
            .setLanguage("French")
            .setPublisher("Oxford Press")
            .setSpecialEdition("Signed Copy")
            .setPackaging("Eco-Friendly Packaging")
            .build();

        expect(mapper.map(jsonData)).toEqual(expectedJSData);
    });

    it('should throw an error for missing optional fields', () => {
        const jsonData = {
        "Book Title": "Edge of Eternity",
        "Author": "Dan Brown",
        "Genre": "Science Fiction",
        "Format": "Paperback",
        "Language": "French",
        "Publisher": "Oxford Press"
        };

        expect(() => mapper.map(jsonData)).toThrow();
    });
});
    describe('reverseMap()', () => {
    it('should map JS object into json object using reverseMap', () => {
       
       const bookJS = BookBuilder.newBuilder()
        .setBookTitle("Edge of Eternity")
        .setAuthor("Dan Brown")
        .setGenre("Science Fiction")
        .setFormat("Paperback")
        .setLanguage("French")
        .setPublisher("Oxford Press")
        .setSpecialEdition("Signed Copy")
        .setPackaging("Eco-Friendly Packaging")
        .build();


        const expectedJsonData = {
            "Book Title": "Edge of Eternity",
            "Author": "Dan Brown",
            "Genre": "Science Fiction",
            "Format": "Paperback",
            "Language": "French",
            "Publisher": "Oxford Press",
            "Special Edition": "Signed Copy",
            "Packaging": "Eco-Friendly Packaging"
        };
        expect(mapper.reverseMap(bookJS)).toEqual(expectedJsonData);
    });
    it("map -> reverseMap should return the same JSON data", () => {
    const jsonData = {
        "Book Title": "Edge of Eternity",
        "Author": "Dan Brown",
        "Genre": "Science Fiction",
        "Format": "Paperback",
        "Language": "French",
        "Publisher": "Oxford Press",
        "Special Edition": "Signed Copy",
        "Packaging": "Eco-Friendly Packaging"
    };

    const book = mapper.map(jsonData);
    expect(mapper.reverseMap(book)).toEqual(jsonData);
});
    });
});
