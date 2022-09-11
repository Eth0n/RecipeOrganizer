export interface CreatedRecipe {
    name: string;
    duration: number;
    steps: Step[];
}

export interface Step {
    id: string;
    description: string;
    ingredients: UsedIngredient[];
}

export interface UsedIngredient {
    name: string;
    quantity: number;
    unit?: UsedUnit;
}

export interface UsedUnit {
    name: string;
    shortDescription: string;
}

export interface IFormValues {
    // Recipe
    recipeName: string;
    duration: number;
    // Step
    description: string;
    // Ingredient
    ingredientName: string;
    amount: number;
    unit: string;
    customUnit: string;
    customShort: string;
}
