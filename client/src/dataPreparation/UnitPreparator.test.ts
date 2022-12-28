import { IUnit } from "../interfaces/interfaces";
import { getExtendedUnitLinks } from "../tests/integration/mocks/MockUnits";
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
