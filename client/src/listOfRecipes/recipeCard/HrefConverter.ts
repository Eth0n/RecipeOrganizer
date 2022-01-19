import { ILink, ILinksRecipe } from "../../interfaces/interfaces";

export type UiLinks = ILinksRecipe;

export function getHrefLinksForRecipe(recipeLinks: ILinksRecipe): UiLinks {
    return {
        ingredient: createReplacedLink(recipeLinks.ingredient),
        recipe: createReplacedLink(recipeLinks.recipe),
        self: createReplacedLink(recipeLinks.self),
        step: createReplacedLink(recipeLinks.step),
    };
}

function createReplacedLink(link: ILink): ILink {
    const importantBits = extractImportantPartOfLink(link);
    const localHostLink = createLocalHostLink(importantBits);
    return createLink(localHostLink);
}

function createLink(link: string): ILink {
    return { href: link };
}

const LOCALHOST = "http://localhost:3000";
function createLocalHostLink(path: string): string {
    return `${LOCALHOST}${path}`;
}

export function extractImportantPartOfLink(link: ILink): string {
    return link.href.substring(21, link.href.length);
}
