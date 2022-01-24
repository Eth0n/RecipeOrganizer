import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateRecipeForm, {
    PlaceholderName,
} from "../../createRecipe/CreateRecipeForm";
import {
    PlaceholderIngredientAmount,
    PlaceholderIngredientName,
} from "../../createRecipe/ingredients/AddIngredient";
import { UiTextAddStep } from "../../createRecipe/steps/AddSingleStep";
import {
    PlaceHolderDescription,
    UiTextSave,
} from "../../createRecipe/steps/EditModeStep";
import { UiTestEdit } from "../../createRecipe/steps/SingleStep";
import { Api } from "../../api/Api";
import { getExtendedUnitLinks } from "../../dataPreparation/UnitPreparator.test";

const mockUnits = [
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

describe("CreateRecipeWorkflowSpec", () => {
    beforeEach(() => {
        const spyAllUnits = jest.spyOn(Api, "getAllUnits");
        spyAllUnits.mockResolvedValue(mockUnits);
    });

    it("can create a whole recipe in one go", async () => {
        render(<CreateRecipeForm />);

        // Enter name
        const expectedRecipeName = "Neues ultra cooles Rezept";
        const nameInput = screen.getByPlaceholderText(PlaceholderName);
        userEvent.type(nameInput, expectedRecipeName);
        expect(nameInput).toHaveValue(expectedRecipeName);

        // Add a step
        const addStep = screen.getByText(UiTextAddStep);
        userEvent.click(addStep);

        // Enter step info
        const expectedStep1 = "Zwiebeln schneiden";
        const expectedIngredient1 = "Zwiebeln";
        const expectedAmount1 = "10";

        userEvent.type(
            screen.getByPlaceholderText(PlaceHolderDescription),
            expectedStep1
        );

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientName),
            expectedIngredient1
        );

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientAmount),
            expectedAmount1
        );
        // Pick other unit
        userEvent.click(screen.getByText(UiTextSave));

        // Edit step, add a second ingredient

        userEvent.click(screen.getByText(UiTestEdit));

        // First ingredient should show up
        expect(screen.getByText(expectedIngredient1)).toBeDefined();
        expect(screen.getByText(expectedAmount1)).toBeInTheDocument();

        // Then enter a second
        const expectedStep2 = "Gurke reiben";
        const expectedIngredient2 = "Gurke";
        const expectedAmount2 = "100";

        userEvent.type(
            screen.getByPlaceholderText(PlaceHolderDescription),
            expectedStep2
        );

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientName),
            expectedIngredient2
        );

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientAmount),
            expectedAmount2
        );

        // Should show up immediately
    });
});
