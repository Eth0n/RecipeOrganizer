import { IShortRecipe } from "../interfaces/interfaces";

export function prepareListOfRecipes(list: any): IShortRecipe[] {
    const result: IShortRecipe[] = [];
    for (const recipe of list) {
        result.push({
            duration: recipe.duration,
            links: recipe._links,
            name: recipe.name,
        });
    }
    return result;
}
