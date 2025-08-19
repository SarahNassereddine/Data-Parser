import logger from "../../logger/logger";
import {Toy} from "../toy.model";

export class ToyBuilder{
        private type!: string;
        private ageGroup!: string;
        private brand!: string;
        private material!: string;
        private batteryRequired!: string;
        private educational! : string;
    public static newBuilder(): ToyBuilder {
        return new ToyBuilder();
    }
    setType(type: string): ToyBuilder {
        this.type = type;
        return this;
    }

    setAgeGroup(ageGroup: string): ToyBuilder {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string): ToyBuilder {
        this.brand = brand;
        return this;
    }

    setMaterial(material: string): ToyBuilder {
        this.material = material;
        return this;
    }

    setBatteryRequired(batteryRequired: string): ToyBuilder {
        this.batteryRequired = batteryRequired;
        return this;
    }

    setEducational(educational: string): ToyBuilder {
        this.educational = educational;
        return this;
    }
    build():Toy{
        const requiredProperties=[
        this.type,
        this.ageGroup,
        this.brand,
        this.material,
        this.batteryRequired,
        this.educational
        ];
    for(const property of requiredProperties){
         if(property===null || property===undefined){
                logger.error("Missing required properties, could not build a toy");
                throw new Error("Missing requiered properties");
            }
    }
    return new Toy(
        this.type,
        this.ageGroup,
        this.brand,
        this.material,
        this.batteryRequired,
        this.educational
    );
    }
}
