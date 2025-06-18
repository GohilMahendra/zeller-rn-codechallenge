import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Customer from '../../src/screens/Customer';
import { NavigationContainer } from '@react-navigation/native';

const mockGoBack = jest.fn();

const mocked_user = {
  id: '1',
  name: 'mahendra',
  email: 'mahendra@example.com',
  role: 'Admin',
};

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
    useRoute: () => ({
      params: {
        user: {
          id: '1',
          name: 'Mahendra',
          email: 'mahendra@example.com',
          role: 'Admin',
        },
      },
    }),
  };
});

describe('Customer screen...', () => {
  it('renders user data from route params', () => {
    render(<Customer />);

    const txtName = screen.getByTestId('Customer_txtName');
    const txtRole = screen.getByTestId('Customer_txtRole');
    const txtEmail = screen.getByTestId('Customer_txtEmail');
    expect(txtName).toHaveTextContent('Mahendra');
    expect(txtRole).toHaveTextContent(mocked_user.role);
    expect(txtEmail).toHaveTextContent(mocked_user.email);
  });

  it('triggers goBack on back press', () => {
    render(<Customer />);
    const backButton = screen.getByTestId('Customer_Header_btnBack');
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalled();
  });
});
