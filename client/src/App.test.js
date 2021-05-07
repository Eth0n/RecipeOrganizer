import { render, screen } from '@testing-library/react';
import App from './App';
import { getExtdendedMockShortRecipe } from "./recipeDetails/MockRecipe";
import { Api } from "./api/Api";

test('renders Header and recipes', async () => {

    jest.spyOn(Api, "getRecipes").mockResolvedValue([
        getExtdendedMockShortRecipe({ name: "recipe 1" }),
        getExtdendedMockShortRecipe({ name: "recipe 2" }),
    ]);
    render(<App />);

    const recipes = await screen.findAllByText("recipe", { exact: false });
    expect(recipes.length).toBeGreaterThanOrEqual(1);
});
 