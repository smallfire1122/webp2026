import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello CGU heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/hello cgu!!/i);
  expect(headingElement).toBeInTheDocument();
});
