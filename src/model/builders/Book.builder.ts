import logger from "../../logger/logger";
import { Book } from "../book.model";

export class BookBuilder{
        private bookTitle!: string ;
        private author!: string;
        private genre!: string;
        private format!: string;
        private language!: string;
        private publisher!: string; 
        private specialEdition!: string;
        private packaging!: string;
    
    public static newBuilder(): BookBuilder {
        return new BookBuilder();
    }

    setBookTitle(title: string): BookBuilder {
        this.bookTitle = title;
        return this;
    }

    setAuthor(author: string): BookBuilder {
        this.author = author;
        return this;
    }

     setGenre(genre: string): BookBuilder {
        this.genre = genre;
        return this;
    }

     setFormat(format: string): BookBuilder {
        this.format = format;
        return this;
    }

    setLanguage(language: string): BookBuilder {
        this.language = language;
        return this;
    }

    setPublisher(publisher: string): BookBuilder {
        this.publisher = publisher;
        return this;
    }

    setSpecialEdition(specialEdition: string): BookBuilder {
        this.specialEdition = specialEdition;
        return this;
    }

    setPackaging(packaging: string): BookBuilder {
        this.packaging = packaging;
        return this;
    }
    build():Book {
        const requiredProperties=[
        this.bookTitle,
        this.author,
        this.genre,
        this.format,
        this.language,
        this.publisher,
        this.specialEdition,
        this.packaging
        ];
    for(const property of requiredProperties){
         if(property===null || property===undefined){
                logger.error("Missing required properties, could not build a book");
                throw new Error("Missing requiered properties");
            }
    }
    return new Book(
         this.bookTitle,
        this.author,
        this.genre,
        this.format,
        this.language,
        this.publisher,
        this.specialEdition,
        this.packaging 
    );
    }

}
