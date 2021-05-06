import { getExtendedLinks } from "../../recipeDetails/MockRecipe";
import {
    extractImportantPartOfLink,
    getHrefLinksForRecipe,
} from "./HrefConverter";

describe("getHrefLinksForRecipe", () => {
    describe("ingredients", () => {
        it("returns link object that contains the ingredients", () => {
            const result = getHrefLinksForRecipe(getExtendedLinks({}));
            expect(result.ingredient).toBeDefined();
        });
        it("link contains string 'ingredient'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).ingredient.href
            ).toContain("ingredient");
        });
        it("link contains 'http://localhost:3000'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).ingredient.href
            ).toContain("http://localhost:3000");
        });
        it("links is correctly combined", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).ingredient.href
            ).toBe("http://localhost:3000/receipts/3/ingredient");
        });
    });

    describe("self", () => {
        it("returns link object that contains the self", () => {
            const result = getHrefLinksForRecipe(getExtendedLinks({}));
            expect(result.self).toBeDefined();
        });
        it("link does not contains string 'self'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).self.href
            ).not.toContain("self");
        });
        it("link contains 'http://localhost:3000'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).self.href
            ).toContain("http://localhost:3000");
        });
    });

    describe("recipe", () => {
        it("returns link object that contains the self", () => {
            const result = getHrefLinksForRecipe(getExtendedLinks({}));
            expect(result.recipe).toBeDefined();
        });
        it("link contains string 'receipts'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).recipe.href
            ).toContain("receipts");
        });
        it("link contains 'http://localhost:3000'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).recipe.href
            ).toContain("http://localhost:3000");
        });
    });

    describe("step", () => {
        it("returns link object that contains the step", () => {
            const result = getHrefLinksForRecipe(getExtendedLinks({}));
            expect(result.recipe).toBeDefined();
        });
        it("link contains string 'step'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).step.href
            ).toContain("step");
        });
        it("link contains 'http://localhost:3000'", () => {
            expect(
                getHrefLinksForRecipe(getExtendedLinks({})).step.href
            ).toContain("http://localhost:3000");
        });
    });
});

describe("extractImportantPartOfLink", () => {
    it("returns part of the link that comes after http://localhost:8080", () => {
        const importantPart = "/receipts/3";
        expect(
            extractImportantPartOfLink({
                href: "http://localhost:8080/receipts/3",
            })
        ).toBe(importantPart);
    });
});
