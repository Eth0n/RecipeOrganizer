import { render, screen } from '@testing-library/react';
import { IShortRecipe } from '../../interfaces/interfaces';
import { getExtdendedMockShortRecipe } from '../../recipeDetails/MockRecipe';
import RecipeCard from './RecipeCard';

test('renders a card with and image and text', async () => {
    const testRecipe: IShortRecipe = getExtdendedMockShortRecipe({});
    render(<RecipeCard {...testRecipe}/>);
    const cardImage = await screen.findByAltText(`${testRecipe.name}`, { exact: false});
    expect(cardImage).toBeInTheDocument();  
});
