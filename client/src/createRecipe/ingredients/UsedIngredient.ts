export interface UsedIngredient {
    name: string;
    quantity: number;
    unit: UsedUnit;
}

export interface UsedUnit {
    name: string;
    shortDescription: string;
}
