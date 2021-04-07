import {
    prepareListOfRecipes,
    prepareRecipe,
} from "../dataPreparation/RecipeListPreparator";
import { IShortRecipe } from "../interfaces/interfaces";

const BASE_URL_RECEIPES = "/receipts";

export class Api {
    /**
     * getRecipes
     */
    public static getRecipes(): Promise<IShortRecipe[]> {
        return new Promise((resolve, reject) => {
            fetch(BASE_URL_RECEIPES).then(async (response) => {
                const json = await response.json();
                const recipes = json._embedded.receipts;
                resolve(prepareListOfRecipes(recipes));
            });
        });
    }

    public static getRecipeById(id: string): Promise<IShortRecipe> {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL_RECEIPES}/${id}`).then(async (response) => {
                const json = await response.json();
                resolve(prepareRecipe(json));
            });
        });
    }
}
