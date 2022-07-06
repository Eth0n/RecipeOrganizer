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

export function getExtendedUnitLinks(
    extension?: Partial<ILinksUnit>
): ILinksUnit {
    return {
        self: { href: "http://localhost:8080/units/1" },
        unit: { href: "http://localhost:8080/units/1" },
        ...extension,
    };
}
