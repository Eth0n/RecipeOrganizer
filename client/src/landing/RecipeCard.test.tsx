import { render, screen } from '@testing-library/react';
import { IShortRecipe } from '../interfaces/interfaces';
import RecipeCard from './RecipeCard';

test('renders a card with and image and text', async () => {
    const testRecipe: IShortRecipe =  {
        name: "Test recipe",
        id: 999,
        duration: 500,
    };
    render(<RecipeCard {...testRecipe}/>);
    const cardImage = await screen.findByAltText(`${testRecipe.name}`, { exact: false});
    expect(cardImage).toBeInTheDocument();
});
