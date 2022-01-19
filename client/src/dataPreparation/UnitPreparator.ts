import { IUnit } from "../interfaces/interfaces";

export function prepareListOfUnits(unitsJson: any): IUnit[] {
    const result: IUnit[] = [];
    for (const unit of unitsJson) {
        result.push(getUnitInfo(unit));
    }
    return result;
}

function getUnitInfo(unit: any): IUnit {
    return {
        name: unit.name,
        links: unit._links,
        shortDescription: unit.shortDescription,
    };
}
