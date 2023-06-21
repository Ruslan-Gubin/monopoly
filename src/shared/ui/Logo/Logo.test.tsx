import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Logo onClick={() => {}} />);
    expect(getByText('Monopoly')).toBeInTheDocument();
  });

  it('should call onClick with "/" when clicked', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(<Logo onClick={onClickMock} />);
    const logoElement = getByRole('link', { name: 'Monopoly' });
    fireEvent.click(logoElement);
    expect(onClickMock).toHaveBeenCalledWith('/'); 
  });
});
