import { getExtendedLinks } from "../recipeDetails/MockRecipe";
import { prepareListOfRecipes, prepareRecipe } from "./RecipeListPreparator";

describe("RecipeListPreparatorSpec", () => {
    describe("prepareListOfRecipes", () => {
        it("retuns empty array if no recipes are passed in", () => {
            expect(prepareListOfRecipes([])).toEqual([]);
        });
        it("returns converted list of recipes", () => {
            const convertedRecipes = prepareListOfRecipes([
                {
                    duration: 20,
                    _links: getExtendedLinks({}),
                    name: "Test",
                },
            ]);
            expect(convertedRecipes).toEqual([
                {
                    duration: 20,
                    links: getExtendedLinks({}),
                    name: "Test",
                },
            ]);
        });
    });
    describe("prepareRecipe", () => {
        it("prepares a single recipe", () => {
            const convertedRecipe = prepareRecipe({
                duration: 20,
                _links: getExtendedLinks({}),
                name: "Test",
            });
            expect(convertedRecipe).toEqual({
                duration: 20,
                links: getExtendedLinks({}),
                name: "Test",
            });
        });
    });
});
