import React from 'react';
import { render } from '@testing-library/react';
import { SelectionChatList } from './SelectionChatList';


jest.mock('@/features', () => ({
  useSelectionMessage: jest.fn(() => ({
    messages: [],
  })),
}));

describe('SelectionChatList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render anything if messages array is empty', () => {
    const { container } = render(<SelectionChatList />);

    expect(container.firstChild).toBe(null);
  });
});


