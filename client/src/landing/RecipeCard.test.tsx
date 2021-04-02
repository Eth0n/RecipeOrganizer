import { render, screen } from '@testing-library/react';
import { IRecipe } from '../interfaces/interfaces';
import RecipeCard from './RecipeCard';

test('renders a card with and image and text', async () => {
    const testRecipe: IRecipe =  {
        name: "Test recipe",
        id: 999,
        durantion: 500,
        ingredients: [],
        steps: []
    };
    render(<RecipeCard {...testRecipe}/>);
    const cardImage = await screen.findByAltText(`${testRecipe.name}`, { exact: false});
    expect(cardImage).toBeInTheDocument();
});
