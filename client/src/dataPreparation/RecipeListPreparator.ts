import { IShortRecipe } from "../interfaces/interfaces";

export function prepareListOfRecipes(list: any): IShortRecipe[] {
    const result: IShortRecipe[] = [];
    for (const recipe of list) {
        result.push(getRecipeInfo(recipe));
    }
    return result;
}

function getRecipeInfo(recipe: any): IShortRecipe {
    return {
            duration: recipe.duration,
            links: recipe._links,
            name: recipe.name,
    }
}

export function prepareRecipe(recipeJson: any): IShortRecipe {
    return getRecipeInfo(recipeJson);
}