import {CSVCakeMapper} from "../../src/mappers/Cake.mapper";
import { CakeBuilder } from "../../src/model/builders/Cake.builder";

describe("CSVakeMapper", () => {
    let mapper: CSVCakeMapper;

    beforeAll(() => {
        mapper = new CSVCakeMapper();
    });

    describe('map()', () => {
        it('should map CSV data to Cake object correctly', () => {
            const csvData = ["0","Sponge","Vanilla","Cream","20","2","Buttercream","Vanilla","Sprinkles","Multi-color","Happy Birthday","Round","Nut-Free","Organic Ingredients","Standard Box","50","1"];
//"id","Type","Flavor","Filling","Size","Layers","Frosting Type","Frosting Flavor","Decoration Type","Decoration Color","Custom Message","Shape","Allergies","Special Ingredients","Packaging Type","Price","Quantity"
            const expectedCake = CakeBuilder.newBuilder()
                .setType("Sponge")
                .setFlavor("Vanilla")
                .setFilling("Cream")
                .setSize(20)
                .setLayers(2)
                .setFrostingType("Buttercream")
                .setFrostingFlavor("Vanilla")
                .setDecorationType("Sprinkles")
                .setDecorationColor("Multi-color")
                .setCustomMessage("Happy Birthday")
                .setShape("Round")
                .setSpecialIngredients("Organic Ingredients")
                .setShape("Round")
                .setAllergies("Nut-Free"    )
                .setPackagingType("Standard Box")
                .build();

            expect(mapper.map(csvData)).toEqual(expectedCake);
        });

        it("should throw an error for missing properties",()=>{
            const incompleteData = ["Sponge","Vanilla","Cream","20"];
                    // missing Layers, FrostingType, FrostingFlavor..
            
            expect(() => mapper.map(incompleteData)).toThrow();
        });
          it('should throw an error for empty CSV', () => {
            expect(() => mapper.map([])).toThrow();
        });
    });

    describe('reverseMap()', () => {
        it('should map JS Cake object to CSV format correctly', () => {
            const cake = CakeBuilder.newBuilder()
                .setType("Sponge")
                .setFlavor("Vanilla")
                .setFilling("Cream")
                .setSize(20)
                .setLayers(2)
                .setFrostingType("Buttercream")
                .setFrostingFlavor("Vanilla")
                .setDecorationType("Sprinkles")
                .setDecorationColor("Multi-color")
                .setCustomMessage("Happy Birthday")
                .setShape("Round")
                .setSpecialIngredients("Organic Ingredients")
                .setAllergies("Nut-Free")
                .setPackagingType("Standard Box")
                .build();

            const expectedCsvData = ["Sponge",
                                    "Vanilla",
                                    "Cream",
                                    "20",
                                    "2",
                                    "Buttercream",
                                    "Vanilla",
                                    "Sprinkles",
                                    "Multi-color",
                                    "Happy Birthday",
                                    "Round",
                                    "Nut-Free",
                                    "Organic Ingredients",
                                    "Standard Box"];

            expect(mapper.reverseMap(cake)).toEqual(expectedCsvData);
        });
      
        it("map -> reverseMap should return the same CSV data", () => {
    const csvData = ["0","Sponge","Vanilla","Cream","20","2","Buttercream","Vanilla",
                     "Sprinkles","Multi-color","Happy Birthday","Round","Nut-Free","Organic Ingredients","Standard Box","50","1"];
    const cake = mapper.map(csvData);
    expect(mapper.reverseMap(cake)).toEqual(csvData.slice(1, 15)); // slice to ignore ID and Price/Quantity
});
    });
});
