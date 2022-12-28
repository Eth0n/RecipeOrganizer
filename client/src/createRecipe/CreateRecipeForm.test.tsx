import { render, screen } from "@testing-library/react";
import CreateRecipeForm from './CreateRecipeForm';

describe("CreateRecipeForm.test", () => {
    describe("has fields for", () => {
        beforeAll(() => {
            render(<CreateRecipeForm />)
        });
        it("recipe name", () => {
            const name = screen.getByLabelText("name", { exact: false });
            expect(name).toBeInTheDocument();
        });
    });
});
