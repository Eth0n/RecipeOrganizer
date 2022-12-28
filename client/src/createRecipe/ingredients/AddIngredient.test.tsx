import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMockUnits } from "../../tests/integration/mocks/MockUnits";
import { UsedUnit } from "../interfaces/interfaces";
import {
    AddIngredient,
    AddIngredientProps,
    LabelUnit,
    PlaceholderCustomUnitName,
    PlaceholderCustomUnitShort,
} from "./AddIngredient";

describe("AddIngredientSpec", () => {
    it("initially shows no input fields for custom unit", () => {
        const props = getExtendedAddIngredientProps({});
        render(<AddIngredient {...props} />);

        expect(
            screen.queryByPlaceholderText(PlaceholderCustomUnitName)
        ).toBeNull();
        expect(
            screen.queryByPlaceholderText(PlaceholderCustomUnitShort)
        ).toBeNull();
    });
    it("show initial unit as first from list of available units", () => {
        const props = getExtendedAddIngredientProps({});
        render(<AddIngredient {...props} />);

        expectSelectedOptionToBe(`${props.availableUnits[0].name}`);
    });
    /* it("shows selected unit based on passed on passed in from props", () => {
        const selectedUnit = {
            name: "Liter",
            shortDescription: "l",
        };
        const props = getExtendedAddIngredientProps({
            selectedUnit,
            listOfUnits: [...getMockUnits(), selectedUnit],
        });
        render(<AddUnitSection {...props} />);
        expectSelectedOptionToBe(`${props.selectedUnit?.name}`);
    }); */
    it("when selecting 'eigene' two new inputs show up to enter", () => {
        const props = getExtendedAddIngredientProps({});
        render(<AddIngredient {...props} />);

        const selector = screen.getByLabelText(LabelUnit);
        userEvent.selectOptions(selector, ["eigene"]);

        expectSelectedOptionToBe("Eigene");
        expect(
            screen.getByPlaceholderText(PlaceholderCustomUnitName)
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(PlaceholderCustomUnitShort)
        ).toBeInTheDocument();
    });
    /*  it("entering values into custom unit fields sends update to parent", () => {
        let unit: UsedUnit = {
            name: "",
            shortDescription: "",
        };
        const onUnitChanged = (updated: UsedUnit) => {
            unit = updated;
        };

        const props = getExtendedAddIngredientProps({
            onUnitChanged,
        });
        render(<AddIngredient {...props} />);

        const selector = screen.getByLabelText(LabelUnit);
        userEvent.selectOptions(selector, ["eigene"]);

        const customName = screen.getByPlaceholderText(
            PlaceholderCustomUnitName
        );
        const customShort = screen.getByPlaceholderText(
            PlaceholderCustomUnitShort
        );

        userEvent.type(customName, "meine unit");
        userEvent.type(customShort, "mU");

        expect(unit.name).toBe("meine unit");
        expect(unit.shortDescription).toBe("mU");
    }); */

    function expectSelectedOptionToBe(expectedSelectedOption: string) {
        expect(
            (screen.getByText(expectedSelectedOption) as HTMLOptionElement)
                .selected
        ).toBeTruthy();
    }
});

function getExtendedAddIngredientProps(
    extension: Partial<AddIngredientProps>
): AddIngredientProps {
    return {
        availableUnits: getMockUnits(),
        saveIngredient: (_newUnit: UsedUnit) => {},
        ...extension,
    };
}
