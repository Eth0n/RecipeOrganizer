import { ILinksRecipe, IShortRecipe } from "../interfaces/interfaces";

export function getExtdendedMockShortRecipe(
    extension: Partial<IShortRecipe>
): IShortRecipe {
    const name = extension.name || "Test recipe";
    return {
        name,
        duration: 500,
        links: getExtendedLinks({
            self: {
                href: `http://localhost:8080/receipts/${name}`,
            },
        }),
        ...extension,
    };
}

export function getExtendedLinks(extension: Partial<ILinksRecipe>) {
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
