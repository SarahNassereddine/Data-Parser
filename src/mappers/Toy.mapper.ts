import { ToyBuilder } from "../model/builders/Toy.builder";
import { Toy } from "../model/toy.model";
import { IMapper } from "./IMapper";

export class XMLToyMapper implements IMapper<{ [key: string]: string },Toy>{
    map(data:{ [key: string]: string }):Toy{
        return ToyBuilder.newBuilder()
                         .setAgeGroup(data.AgeGroup)
                         .setBatteryRequired(data.BatteryRequired)
                         .setBrand(data.Brand)
                         .setEducational(data.Educational)
                         .setMaterial(data.Material)
                         .setType(data.Type)
                         .build();
    }
    reverseMap(data: Toy): { [key: string]: string }{
        return {
        "Type": data.getType(),
        "AgeGroup": data.getAgeGroup(),
        "Brand":data.getBrand(),
        "Material": data.getMaterial(),
        "BatteryRequired":data.getBatteryRequired(),
        "Educational":data.getEducational(),
        }
    }
}
