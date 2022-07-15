import { UsedUnit } from "../../../createRecipe/interfaces/interfaces";
import { ILinksUnit } from "../../../interfaces/interfaces";

export const getMockUnits = () => [
    {
        name: "Stück",
        links: getExtendedUnitLinks(),
        shortDescription: "st",
    },
    {
        name: "Mililliter",
        links: getExtendedUnitLinks(),
        shortDescription: "ml",
    },
];

export function getExtendedMockUnit(extension?: Partial<UsedUnit>): UsedUnit {
    return {
        name: "Mililliter",
        shortDescription: "ml",
        ...extension,
    };
}

export function getExtendedUnitLinks(
    extension?: Partial<ILinksUnit>
): ILinksUnit {
    return {
        self: { href: "http://localhost:8080/units/1" },
        unit: { href: "http://localhost:8080/units/1" },
        ...extension,
    };
}
