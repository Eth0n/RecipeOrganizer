import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMockUnits } from "../../tests/integration/CreateRecipeWorkflow.test";
import {
    PlaceholderIngredientAmount,
    PlaceholderIngredientName,
    UITextPlusSignAddIngredient,
} from "../ingredients/AddIngredient";
import {
    AddSingleStep,
    AddSingleStepProps,
    UiTextAddStep,
} from "./AddSingleStep";
import { PlaceHolderDescription } from "./EditModeStep";
describe("AddSingleStep.test.tsx", () => {
    it("shows added ingredient if user adds multiple ingredients in one go", async () => {
        render(<AddSingleStep {...getExtendedTextInputProps({})} />);

        const addStep = screen.getByText(UiTextAddStep);
        userEvent.click(addStep);

        const expectedDescription = "Kartoffeln schneiden";
        userEvent.type(
            screen.getByPlaceholderText(PlaceHolderDescription),
            expectedDescription
        );

        const expectedIngredientName = "Kartoffeln";
        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientName),
            expectedIngredientName
        );

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientName),
            "{enter}"
        );

        const expectedAmount = "10";
        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientAmount),
            expectedAmount
        );

        const addIngredient = await screen.findByTitle(
            UITextPlusSignAddIngredient
        );
        addIngredient.click();

        await screen.findByText(expectedDescription, { exact: true });
        await screen.findByText(expectedIngredientName, { exact: true });
        await screen.findByText(expectedAmount, { exact: false });
    });
});

function getExtendedTextInputProps(
    extension: Partial<AddSingleStepProps>
): AddSingleStepProps {
    return {
        availableUnits: getMockUnits(),
        onStepAdded: () => {},
        ...extension,
    };
}

/* function getMockStep(extension?: Partial<Step>): Step {
    return {
        id: "",
        description: "",
        ingredients: [],
        ...extension,
    };
} */
