import { IShortRecipe } from "../interfaces/interfaces";

export function getExtdendedMockShortRecipe(
    extension: Partial<IShortRecipe>
): IShortRecipe {
    return {
        name: "Test recipe",
        duration: 500,
        links: {
            ingredient: { href: "" },
            recipe: { href: "" },
            self: { href: "999" },
            step: { href: "" },
        },
    };
}
