import { Api } from "../../api/Api";
import { getExtendedMockIngredient } from "../../tests/integration/mocks/MockIngredient";
import {
    getExtendedMockUnit,
    getMockUnits,
} from "../../tests/integration/mocks/MockUnits";
import { dispatchUnitIfNecessary } from "./UnitDispatcher";

describe("UnitDispatcher.test.ts", () => {
    describe("dispatchUnitIfNecessary", () => {
        let spyPostUnit: jest.SpyInstance;
        beforeEach(() => {
            const spyAllUnits = jest.spyOn(Api, "getAllUnits");
            spyAllUnits.mockResolvedValue(getMockUnits());
            spyPostUnit = jest.spyOn(Api, "postUnit").mockResolvedValue({});
        });
        it("if unit exists doesn't send a request to create it", async () => {
            const ingredients = [
                getExtendedMockIngredient({
                    name: "Reis",
                    quantity: 1,
                    unit: getExtendedMockUnit({
                        name: "Kilo",
                        shortDescription: "kg",
                    }),
                }),
                getExtendedMockIngredient({
                    name: "Apfel",
                    quantity: 1,
                    unit: getExtendedMockUnit({
                        name: "Stück",
                        shortDescription: "st",
                    }),
                }),
            ];
            await dispatchUnitIfNecessary(ingredients);
            expect(spyPostUnit).toHaveBeenCalledTimes(1);
        });
        it("sends one request per not existing unit", async () => {
            const ingredients = [
                getExtendedMockIngredient({
                    name: "Reis",
                    quantity: 1,
                    unit: getExtendedMockUnit({
                        name: "Kilo",
                        shortDescription: "kg",
                    }),
                }),
                getExtendedMockIngredient({
                    name: "Apfel",
                    quantity: 1,
                    unit: getExtendedMockUnit({
                        name: "Säcke",
                        shortDescription: "Säcke",
                    }),
                }),
            ];
            await dispatchUnitIfNecessary(ingredients);
            expect(spyPostUnit).toHaveBeenCalledTimes(2);
        });
        it("if unit is in different caps don't send request", async () => {
            const ingredients = [
                getExtendedMockIngredient({
                    name: "Apfel",
                    quantity: 1,
                    unit: getExtendedMockUnit({
                        name: "stück",
                        shortDescription: "st",
                    }),
                }),
            ];
            await dispatchUnitIfNecessary(ingredients);
            expect(spyPostUnit).not.toHaveBeenCalled();
        });
        it("if unit doesn't exist sends request to create it", async () => {
            const ingredients = [
                getExtendedMockIngredient({
                    name: "Reis",
                    quantity: 1,
                    unit: getExtendedMockUnit({
                        name: "Kilo",
                        shortDescription: "kg",
                    }),
                }),
            ];
            await dispatchUnitIfNecessary(ingredients);
            expect(spyPostUnit).toHaveBeenCalledWith({
                name: "Kilo",
                shortDescription: "kg",
            });
        });
    });
});
