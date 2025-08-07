import {CakeBuilder} from "../src/model/builders/Cake.builder";
import{BookBuilder} from  "../src/model/builders/Book.builder";
import{ToyBuilder} from "../src/model/builders/Toy.builder";
    let cakeBuilder: CakeBuilder;
    let bookBuilder: BookBuilder;
    let toyBuilder: ToyBuilder;
//before *each* to have an object to test withoout any previous modifications
beforeEach(()=>{
    cakeBuilder=new CakeBuilder();
    bookBuilder=new BookBuilder();
    toyBuilder=new ToyBuilder();
    
})
describe("testing CakeBuilder..", ()=>{
    it("should build a cake",()=>{
        const cake=cakeBuilder.setType("type") 
               .setFlavor("flavor")
               .setFilling("filling")
               .setSize(15)
               .setLayers(3)
               .setFrostingType("frosting type")
               .setFrostingFlavor("frosting flavor")
               .setDecorationType("decoration type")
               .setDecorationColor("decoration color")
               .setCustomMessage("custom message")
               .setShape("shape")
               .setAllergies("Allergies")
               .setSpecialIngredients("sepecial ingrediants")
               .setPackagingType("packaging type")
               .build();
        expect(cake).toEqual({
             type: 'type',
             flavor: 'flavor',
             filling: 'filling',
             size: 15,
             layers: 3,
             frostingType: 'frosting type',
             frostingFlavor: 'frosting flavor',
             decorationType: 'decoration type',
             decorationColor: 'decoration color',
             customMessage: 'custom message',
             shape: 'shape',
             allergies: 'Allergies',
             specialIngredients: 'sepecial ingrediants',
             packagingType: 'packaging type'
        });
    });
    it("should throw an error if missing properties",()=>{
        expect(()=>{
            cakeBuilder.setType("type") 
               .setFlavor("flavor")
               .setFilling("filling")
               .build();
        }).toThrow();
    });

});

describe("testing BookBuilder..",()=>{
    it("should build a book",()=>{
   
    const book=bookBuilder.setAuthor("author")
               .setBookTitle("book title")
               .setFormat("format")
               .setGenre("genre")
               .setLanguage("language")
               .setPackaging("packaging")
               .setPublisher("publisher")
               .setSpecialEdition("special education")
               .build();
        expect(book).toEqual({
             author: 'author',
             bookTitle: 'book title',
             format: 'format',
             genre: 'genre',
             language: 'language',
             packaging: 'packaging',
             publisher: 'publisher',
             specialEdition: 'special education'
        });
    });
    it("should throw an error if missing properties",()=>{
        expect(()=>{
            bookBuilder.setAuthor("author")
               .setBookTitle("book title")
               .setFormat("format")
               .setGenre("genre")
               .build();
        }).toThrow();
    });
});

describe("testing ToyBuilder..",()=>{
    it("should build a toy",()=>{
        const toy=toyBuilder.setAgeGroup("age")
              .setBatteryRequired("battery required")
              .setBrand("brand")
              .setEducational("educational")
              .setMaterial("material")
              .setType("type")
              .build();
        expect(toy).toEqual({
             ageGroup: 'age',
            batteryRequired: 'battery required',
            brand: 'brand',
            educational: 'educational',
            material: 'material',
            type: 'type'
        });
    });
    it("should throw an error if missing properties",()=>{
        expect(()=>{
            toyBuilder.setAgeGroup("age")
              .setBatteryRequired("battery required")
              .setBrand("brand")
              .setEducational("educational")
              .build();
        }).toThrow();
    });
});