export interface Ingredient {
    id: number;
    recipe: IRecipe;
    name: string;
    quantity: number;
    type: IIngredientType;
    unit: IUnit;
    links: ILinksRecipe;
}

export interface IUnit {
    name: string;
    shortDescription: string;
    links: ILinksUnit;
}

export interface IRecipe {
    links: ILinksRecipe;
    name: string;
    durantion: number;
}

export interface IShortRecipe {
    name: string;
    duration: number;
    links: ILinksRecipe;
}

export interface ILinksUnit {
    self: ILink;
    unit: ILink;
}

export interface ILinksRecipe {
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