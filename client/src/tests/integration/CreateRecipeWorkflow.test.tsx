import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateRecipeForm, {
    PlaceholderName,
} from "../../createRecipe/CreateRecipeForm";
import {
    PlaceholderIngredientAmount,
    PlaceholderIngredientName,
    UITextPlusSignAddIngredient,
} from "../../createRecipe/ingredients/AddIngredient";
import { UiTextAddStep } from "../../createRecipe/steps/AddSingleStep";
import {
    PlaceHolderDescription,
    UiTextSave,
} from "../../createRecipe/steps/EditModeStep";
import { UiTextDelete, UiTextEdit } from "../../createRecipe/steps/SingleStep";
import { Api } from "../../api/Api";
import { getMockUnits } from "./mocks/MockUnits";

describe("CreateRecipeWorkflowSpec", () => {
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

        await addStep("Dinge klein schneiden", "Zwiebeln", 10);
        // TODO: Pick other unit

        // Edit step, add a second ingredient
        userEvent.click(screen.getByText(UiTextEdit));

        // First ingredient should show up
        await screen.findByText("Zwiebeln", { exact: true });
        await screen.findByText("10", { exact: true });

        // Then enter a second
        await addIngredient("Gurke", 100);
        userEvent.click(screen.getByText(UITextPlusSignAddIngredient));

        // Second ingredient should show up
        await screen.findByText("Gurke", { exact: true });
        await screen.findByText("100", { exact: true });
    });
    it("delete first step from list of steps", async () => {
        render(<CreateRecipeForm />);
        await addStep("erster Step", "Kartoffeln", 5);
        await addStep("zweiter Step", "Apples", 1);

        const deleteButtons = screen.getAllByText(UiTextDelete);
        userEvent.click(deleteButtons[0]);

        const firstStep = screen.queryByText("erster Step", { exact: true });
        const secondStep = screen.queryByText("zweiter Step", { exact: true });
        expect(secondStep).not.toBeNull();
        expect(firstStep).toBeNull();
    });
});

async function addStep(desc: string, ingredient: string, amount: number) {
    // Add a step
    const addStep = screen.getByText(UiTextAddStep);
    userEvent.click(addStep);

    // Enter step info
    const expectedStep1 = desc;
    userEvent.type(
        screen.getByPlaceholderText(PlaceHolderDescription),
        expectedStep1
    );

    await addIngredient(ingredient, amount);

    userEvent.click(screen.getByText(UiTextSave));
}

async function addIngredient(ingredient: string, amount: number) {
    const expectedIngredient1 = ingredient;
    const expectedAmount1 = `${amount}`;

    userEvent.type(
        screen.getByPlaceholderText(PlaceholderIngredientName),
        ingredient.substring(0, 1)
    );

    const suggestion1 = await screen.findByText(expectedIngredient1);
    userEvent.click(suggestion1);

    userEvent.type(
        screen.getByPlaceholderText(PlaceholderIngredientAmount),
        expectedAmount1
    );
}