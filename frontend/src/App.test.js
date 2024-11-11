import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home page', () => {
  render(<App />);
  const homeElement = screen.getByText(/home/i);  // Adjust this text to something that exists in Home
  expect(homeElement).toBeInTheDocument();
});
