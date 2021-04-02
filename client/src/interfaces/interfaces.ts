export interface Ingredient {
    id: number;
    recipe: IRecipe;
    name: string;
    quantity: number;
    type: IIngredientType;
    unit: IUnit;
}

export interface IUnit {
    id: number;
    name: string;
    shortDescription: string;
}

export interface IRecipe {
    id: number;
    ingredients: Ingredient[];
    steps: IStep[];
    name: string;
    durantion: number;
}

export interface IShortRecipe {
    name: string;
    duration: number;
    id: number;
}

export interface IStep {
    id: number;
    recipe: IRecipe;
    ingredients: Ingredient[];
    name: string;
    description: string;
}

export enum IIngredientType {
    BASE,
    STEP
}