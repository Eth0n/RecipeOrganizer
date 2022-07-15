import { Api } from "../../api/Api";
import { IUnit } from "../../interfaces/interfaces";
import { UsedIngredient, UsedUnit } from "../interfaces/interfaces";

export async function dispatchUnitIfNecessary(ingredients: UsedIngredient[]) {
    const existingUnits = await Api.getAllUnits();
    const newUnits = ingredients.map((ingredient) => ingredient.unit);
    const unitsToAdd = filterUnitsToAdd(newUnits, existingUnits);

    for (const unit of unitsToAdd) {
        await Api.postUnit(unit);
    }
}

function filterUnitsToAdd(
    newUnits: (UsedUnit | undefined)[],
    existingUnits: IUnit[]
): UsedUnit[] {
    const usedUnits: UsedUnit[] = [];
    for (const newUnit of newUnits) {
        if (
            newUnit &&
            !existingUnits.find(
                (unit) => unit.name.toLowerCase() === newUnit.name.toLowerCase()
            )
        ) {
            usedUnits.push(newUnit);
        }
    }
    return usedUnits;
}
