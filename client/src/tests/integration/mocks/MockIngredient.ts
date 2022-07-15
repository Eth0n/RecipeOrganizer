import { UsedIngredient } from "../../../createRecipe/interfaces/interfaces";
import { getExtendedMockUnit } from "./MockUnits";

export function getExtendedMockIngredient(
    extension: Partial<UsedIngredient>
): UsedIngredient {
    return {
        name: "Brot",
        quantity: 1,
        unit: getExtendedMockUnit(),
        ...extension,
    };
}
