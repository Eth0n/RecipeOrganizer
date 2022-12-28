import { IUnit } from "../../interfaces/interfaces";
import {
    IFormValues,
    UsedIngredient,
    UsedUnit,
} from "../interfaces/interfaces";

export function getUsedIngredientFromForm(
    formValues: IFormValues,
    ingredientName: string,
    availableUnits: IUnit[]
): UsedIngredient {
    const unit: UsedUnit =
        formValues.unit === "eigene"
            ? {
                  name: formValues.customUnit,
                  shortDescription: formValues.customShort,
              }
            : getUnitFromList(formValues.unit, availableUnits);
    return {
        name: ingredientName,
        quantity: formValues.amount,
        unit,
    };
}

function getUnitFromList(name: string, availableUnits: IUnit[]): UsedUnit {
    return availableUnits.filter((unit) => unit.name === name)[0];
}
