import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMockUnits } from "../../tests/integration/CreateRecipeWorkflow.test";
import { UsedUnit } from "../interfaces/interfaces";
import {
    AddUnitSection,
    AddUnitSectionProps,
    LabelUnit,
    PlaceholderCustomUnitName,
    PlaceholderCustomUnitShort,
} from "./AddUnitSection";

describe("AddUnitSectionSpec", () => {
    it("initially shows no input fields for custom unit", () => {
        const props = getExtendedUnitSectionProps({});
        render(<AddUnitSection {...props} />);

        expect(
            screen.queryByPlaceholderText(PlaceholderCustomUnitName)
        ).toBeNull();
        expect(
            screen.queryByPlaceholderText(PlaceholderCustomUnitShort)
        ).toBeNull();
    });
    it("show initial unit as first from list of available units", () => {
        const props = getExtendedUnitSectionProps({});
        render(<AddUnitSection {...props} />);

        expectSelectedOptionToBe(`${props.listOfUnits[0].name}`);
    });
    it("shows selected unit based on passed on passed in from props", () => {
        const selectedUnit = {
            name: "Liter",
            shortDescription: "l",
        };
        const props = getExtendedUnitSectionProps({
            selectedUnit,
            listOfUnits: [...getMockUnits(), selectedUnit],
        });
        render(<AddUnitSection {...props} />);
        expectSelectedOptionToBe(`${props.selectedUnit?.name}`);
    });
    it("when selecting 'eigene' two new inputs show up to enter", () => {
        const props = getExtendedUnitSectionProps({});
        render(<AddUnitSection {...props} />);

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
    it("entering values into custom unit fields sends update to parent", () => {
        let unit: UsedUnit = {
            name: "",
            shortDescription: "",
        };
        const onUnitChanged = (updated: UsedUnit) => {
            unit = updated;
        };

        const props = getExtendedUnitSectionProps({
            onUnitChanged,
        });
        render(<AddUnitSection {...props} />);

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
    });

    function expectSelectedOptionToBe(expectedSelectedOption: string) {
        expect(
            (screen.getByText(expectedSelectedOption) as HTMLOptionElement)
                .selected
        ).toBeTruthy();
    }
});

function getExtendedUnitSectionProps(
    extension: Partial<AddUnitSectionProps>
): AddUnitSectionProps {
    return {
        listOfUnits: getMockUnits(),
        selectedUnit: undefined,
        onUnitChanged: (_newUnit: UsedUnit) => {},
        ...extension,
    };
}
