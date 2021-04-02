import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Header and recipes', async () => {
  render(<App />);
  const text = await screen.findByText("First block");
  expect(text).toBeInTheDocument();

  const recipes = await screen.findAllByText("recipe", { exact: false});
  expect(recipes.length).toBeGreaterThanOrEqual(1);
});
 