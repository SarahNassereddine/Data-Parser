import { IItem, ItemCategory } from "./item.model";

export class Book implements IItem{
    constructor(
        private bookTitle: string ,
        private author: string,
        private genre: string,
        private format: string,
        private language: string,
        private publisher: string,
        private specialEdition: string,
        private packaging: string
    ){}
    getCategory(): ItemCategory {
        return ItemCategory.BOOK;
        } 
    getBookTitle(): string{
        return this.bookTitle;
    }
    getGenre(): string{
        return this.genre;
    }
    getFormat(): string{
        return this.format;
    }
     getLanguage(): string{
        return this.language;
    }
    getPublisher(): string{
        return this.publisher;
    }
    getSpecialEdition(): string{
        return this.specialEdition;
    }
    getPackaging(): string{
        return this.packaging;
    }
     getAuthor(): string{
        return this.author;
    }
}