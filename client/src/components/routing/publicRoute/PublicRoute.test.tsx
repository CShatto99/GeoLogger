import { render } from '@testing-library/react';

test('placeholder test', () => {
  const { getByText } = render(<div>Hello, world!</div>);
  expect(getByText('Hello, world!')).toBeInTheDocument();
});
