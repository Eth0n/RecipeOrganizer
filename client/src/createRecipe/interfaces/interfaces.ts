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
