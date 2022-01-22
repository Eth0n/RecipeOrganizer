import { ILinksUnit, IUnit } from "../interfaces/interfaces";
import { prepareListOfUnits } from "./UnitPreparator";

describe("UnitPreparatorSpec", () => {
    describe("prepareListOfUnits", () => {
        it("returns empty array if no units are returned", () => {
            expect(prepareListOfUnits([])).toEqual([]);
        });
        it("returns unit info object in array", () => {
            const expectedUnitInfo: IUnit = {
                name: "name",
                links: getExtendedUnitLinks(),
                shortDescription: "short desc",
            };
            expect(
                prepareListOfUnits([
                    {
                        name: "name",
                        _links: getExtendedUnitLinks(),
                        shortDescription: "short desc",
                    },
                ])
            ).toEqual([expectedUnitInfo]);
        });
    });
});

export function getExtendedUnitLinks(
    extension?: Partial<ILinksUnit>
): ILinksUnit {
    return {
        self: { href: "http://localhost:8080/units/1" },
        unit: { href: "http://localhost:8080/units/1" },
        ...extension,
    };
}
