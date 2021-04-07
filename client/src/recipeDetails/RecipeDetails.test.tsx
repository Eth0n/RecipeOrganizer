import { render, screen } from "@testing-library/react";
import RecipeDetails from "./RecipeDetails";
import { BrowserRouter } from "react-router-dom";
import { Api } from "../api/Api";
import { getExtdendedMockShortRecipe } from "./MockRecipe";

test("renders the the recipe", async () => {

    jest.spyOn(Api, "getRecipeById").mockResolvedValue(
        getExtdendedMockShortRecipe({})
    );

    render(
        <BrowserRouter>
            <RecipeDetails />
        </BrowserRouter>
    );

    const title = await screen.findAllByText("Schniposa", { exact: false });
    expect(title[0]).toBeInTheDocument();

    const duration = await screen.findAllByText('min', { exact: false });
    expect(duration[0]).toBeInTheDocument();
});
