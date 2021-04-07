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
    links: ILinks;
    name: string;
    durantion: number;
}

export interface IShortRecipe {
    name: string;
    duration: number;
    links: ILinks;
}

export interface ILinks {
    ingredient: ILink;
    recipe: ILink;
    self: ILink;
    step: ILink;
}

export interface ILink {
    href: string;
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