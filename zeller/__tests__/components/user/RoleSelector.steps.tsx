import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import RoleSelector from '../../../src/components/user/RoleSelector';

describe('RoleSelector Component....', () => {
  const mockSelectRole = jest.fn();
  const testID = 'TestRoleSelector_';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both roles with proper texts', () => {
    render(
      <RoleSelector
        testID={testID}
        selectedRole={'Admin'}
        onSelectRole={mockSelectRole}
      />,
    );

    const adminButton = screen.getByTestId(`${testID}Admin_btnSelectRole`);
    const managerButton = screen.getByTestId(`${testID}Manager_btnSelectRole`);

    expect(adminButton).toBeTruthy();
    expect(managerButton).toBeTruthy();

    // learned new stuff, always used text children but from now on will use toHaveTextContent
    expect(
      screen.getAllByTestId(`${testID}_txtSelectdRole`)[0],
    ).toHaveTextContent('Admin');
    expect(
      screen.getAllByTestId(`${testID}_txtSelectdRole`)[1],
    ).toHaveTextContent('Manager');
  });

  it('shows correct icon based on selected role', () => {
    render(
      <RoleSelector
        testID={testID}
        selectedRole={'Manager'}
        onSelectRole={mockSelectRole}
      />,
    );

    const managerButton = screen.getByTestId(`${testID}Manager_btnSelectRole`);
    const adminButton = screen.getByTestId(`${testID}Admin_btnSelectRole`);

    expect(managerButton).toBeTruthy();
    expect(adminButton).toBeTruthy();
  });

  it('calls onSelectRole when a role is pressed', () => {
    render(
      <RoleSelector
        testID={testID}
        selectedRole={'Admin'}
        onSelectRole={mockSelectRole}
      />,
    );

    const managerButton = screen.getByTestId(`${testID}Manager_btnSelectRole`);
    fireEvent.press(managerButton);

    expect(mockSelectRole).toHaveBeenCalledWith('Manager');
  });
});
