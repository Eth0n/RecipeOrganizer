import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateRecipeForm, {
    PlaceholderName,
} from "../../createRecipe/CreateRecipeForm";

describe("CreateRecipeWorkflowSpec", () => {
    it("can create a whole recipe in one go", () => {
        render(<CreateRecipeForm />);

        const expectedRecipeName = "Neues ultra cooles Rezept";

        const nameInput = screen.getByPlaceholderText(PlaceholderName);
        userEvent.type(nameInput, expectedRecipeName);
        expect(nameInput).toHaveValue(expectedRecipeName);
    });
});
