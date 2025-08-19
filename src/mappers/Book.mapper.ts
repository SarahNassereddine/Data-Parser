import { BookBuilder } from "../model/builders/Book.builder";
import { Book } from "../model/book.model";
import { IMapper } from "./IMapper";
export class JSONBookMapper implements IMapper<any, Book> {
    map(data: { [key: string]: string }): Book {
        
        return BookBuilder.newBuilder()
            .setBookTitle(data["Book Title"]) // to adapt headers in json headers(+[] to handle spaces)
            .setAuthor(data["Author"])
            .setGenre(data["Genre"]) 
            .setFormat(data["Format"])
            .setLanguage(data["Language"])
            .setPublisher(data["Publisher"])
            .setSpecialEdition(data["Special Edition"])
            .setPackaging(data["Packaging"])
            .build();
    }

    reverseMap(book: Book): { [key: string]: string } {
        return {
            "Book Title": book.getBookTitle(),
            "Author": book.getAuthor(),
            "Genre": book.getGenre(),
            "Format": book.getFormat(),
            "Language": book.getLanguage(),
            "Publisher": book.getPublisher(),
            "Special Edition": book.getSpecialEdition(),
            "Packaging": book.getPackaging()
        };
    }
}

