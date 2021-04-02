import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders learn react link', async () => {
  render(<Header />);
  const text = await screen.findByText("First block");
  expect(text).toBeInTheDocument();
});
