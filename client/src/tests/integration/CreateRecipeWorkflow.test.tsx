import { render, screen } from "@testing-library/react";
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
import { UiTextEdit } from "../../createRecipe/steps/SingleStep";
import { Api } from "../../api/Api";
import { getExtendedUnitLinks } from "../../dataPreparation/UnitPreparator.test";

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

xdescribe("CreateRecipeWorkflowSpec", () => {
    beforeEach(() => {
        const spyAllUnits = jest.spyOn(Api, "getAllUnits");
        spyAllUnits.mockResolvedValue(getMockUnits());
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
        const expectedStep1 = "Dinge klein schneiden";
        const expectedIngredient1 = "Zwiebeln";
        const expectedAmount1 = "10";

        userEvent.type(
            screen.getByPlaceholderText(PlaceHolderDescription),
            expectedStep1
        );

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientName),
            "Z"
        );

        const suggestion1 = await screen.findByText(expectedIngredient1);
        console.log("suggestion1 element", suggestion1);
        userEvent.click(suggestion1);

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientAmount),
            expectedAmount1
        );
        // TODO: Pick other unit

        userEvent.click(screen.getByText(UiTextSave));

        // Edit step, add a second ingredient
        userEvent.click(screen.getByText(UiTextEdit));

        // First ingredient should show up
        await screen.findByText(expectedIngredient1, { exact: false });
        await screen.findByText(expectedAmount1, { exact: false });

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

        const suggestion2 = await screen.findByText(expectedIngredient2);
        console.log("suggestion2 element", suggestion2);
        suggestion2.click();

        userEvent.type(
            screen.getByPlaceholderText(PlaceholderIngredientAmount),
            expectedAmount2
        );

        // Should show up immediately
    });
});
