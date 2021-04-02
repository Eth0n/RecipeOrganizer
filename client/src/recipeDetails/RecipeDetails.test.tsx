import { render, screen } from "@testing-library/react";
import RecipeDetails, { RecipeDetailsProps } from "./RecipeDetails";

test("renders the the recipe", async () => {
    const testRecipeProps: RecipeDetailsProps = {
        durantion: 500,
        ingredients: [],
        id: 999,
        name: "Schniposa"
    }

    render(<RecipeDetails {...testRecipeProps} />);

    const title = await screen.findAllByText("Schniposa", { exact: false });
    expect(title[0]).toBeInTheDocument();

    const portionen = await screen.findAllByText('Portionen', { exact: false });
    expect(portionen[0]).toBeInTheDocument();

    const ingredients = await screen.findAllByText('Zutaten', { exact: false });
    expect(ingredients[0]).toBeInTheDocument();

    const duration = await screen.findAllByText('min', { exact: false });
    expect(duration[0]).toBeInTheDocument();
});
