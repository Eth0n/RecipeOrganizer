import { ILinks, IShortRecipe } from "../interfaces/interfaces";

export function getExtdendedMockShortRecipe(
    extension: Partial<IShortRecipe>
): IShortRecipe {
    return {
        name: "Test recipe",
        duration: 500,
        links: getExtendedLinks({}),
        ...extension,
    };
}

export function getExtendedLinks (extension: Partial<ILinks>) {
    return {
        ingredient: {
            href: "http://localhost:8080/receipts/3/ingredient",
        },
        recipe: { href: "http://localhost:8080/receipts/3" },
        self: { href: "http://localhost:8080/receipts/3" },
        step: { href: "http://localhost:8080/receipts/3/step" },
        ...extension,
    };
}
