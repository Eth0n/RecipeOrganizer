import {
    prepareListOfRecipes,
    prepareRecipe,
} from "../dataPreparation/RecipeListPreparator";
import { prepareListOfUnits } from "../dataPreparation/UnitPreparator";
import { IPostUnit, IShortRecipe, IUnit } from "../interfaces/interfaces";

const BASE_URL_RECEIPES = "/receipts";
const BASE_URL_UNITS = "/units";

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

    public static getAllUnits(): Promise<IUnit[]> {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL_UNITS}`).then(async (response) => {
                const json = await response.json();
                const units = json._embedded.units;
                resolve(prepareListOfUnits(units));
            });
        });
    }

    public static postUnit(newUnit: IPostUnit) {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_URL_UNITS}`, {
                method: "POST",
                body: JSON.stringify(newUnit),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(async (response) => {
                    const json = await response.json();
                    const unit = prepareListOfUnits([json])[0];
                    console.log(unit);
                    resolve(unit);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
}
