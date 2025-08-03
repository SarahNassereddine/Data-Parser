import { IItem, ItemCategory } from "./item.model";

export class Toy implements IItem{
    constructor(
        private type: string,
        private ageGroup: string,
        private brand: string,
        private material: string,
        private batteryRequired: string, // it may be boolean but to handle with api requirement
        private educational : string
    ){}
    getType(): string{
        return this.type;
    }
    getAgeGroup(): string{
        return this.ageGroup;
    }
    getBrand(): string{
        return this.brand;
    }
    getMaterial(): string{
        return this.material;
    }
    getBatteryRequired(): string{
        return this.batteryRequired;
    }
    getEducational(): string{
        return this.educational;
    }
    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }
}
