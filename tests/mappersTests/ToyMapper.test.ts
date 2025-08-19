import {XMLToyMapper} from"../../src/mappers/Toy.mapper";
import { ToyBuilder } from "../../src/model/builders/Toy.builder";
describe("XMLToyMapper",()=>{
    let mapper: XMLToyMapper;
    beforeAll(()=>{
        mapper = new XMLToyMapper();
    })
    describe("map()",()=>{
        it("should map XML format to Toy object",()=>{
            const xmlData = {
                Type: "Plush Toy",
                AgeGroup: "13+",
                Brand: "FunTime",
                Material: "Fabric",
                BatteryRequired: "Yes",
                Educational: "Yes"
            };
            const toy = mapper.map(xmlData); 
            expect(toy).toBeDefined();
            expect(toy.getType()).toEqual("Plush Toy");
            expect(toy.getAgeGroup()).toEqual("13+");
            expect(toy.getBrand()).toEqual("FunTime");
            expect(toy.getMaterial()).toEqual("Fabric");
            expect(toy.getBatteryRequired()).toEqual("Yes");
            expect(toy.getEducational()).toEqual("Yes");
        });
        it("should throw an error for missing properties",()=>{
            const xmlData = {
                Type: "Plush Toy",
                AgeGroup: "13+",
                Brand: "FunTime",
                Material: "Fabric",
                // Missing BatteryRequired and Educational
            };
            expect(() => mapper.map(xmlData)).toThrow();
        });});
        describe("reverseMap()",()=>{
            it("should map Toy object to XML format",()=>{
                const toy = ToyBuilder.newBuilder()
                    .setType("Plush Toy")
                    .setAgeGroup("13+")
                    .setBrand("FunTime")
                    .setMaterial("Fabric")
                    .setBatteryRequired("Yes")
                    .setEducational("Yes")
                    .build();
                const xmlData = mapper.reverseMap(toy);
                expect(xmlData).toBeDefined();
                expect(xmlData.Type).toEqual("Plush Toy");
                expect(xmlData.AgeGroup).toEqual("13+");
                expect(xmlData.Brand).toEqual("FunTime");
                expect(xmlData.Material).toEqual("Fabric");
                expect(xmlData.BatteryRequired).toEqual("Yes");
                expect(xmlData.Educational).toEqual("Yes");
            });
       it("map -> reverseMap should return the same XML data", () => {
           const xmlData = {
               Type: "Plush Toy",
               AgeGroup: "13+",
               Brand: "FunTime",
               Material: "Fabric",
               BatteryRequired: "Yes",
               Educational: "Yes"
           };

           const toy = mapper.map(xmlData);
           expect(mapper.reverseMap(toy)).toEqual(xmlData);
       });
        });
   });
