import { fireEvent, render, screen } from '@testing-library/react-native';
import CustomerCard from '../../../src/components/user/CustomerCard';

describe('Customer Card Component...', () => {
  const MockUser = {
    id: '1',
    name: 'mahendra',
    email: 'mahendra@example.com',
    role: 'Admin',
  };

  const mockOnPress = jest.fn();
  beforeEach(() => {
    render(
      <CustomerCard item={MockUser} onPress={mockOnPress} testID={'User0'} />,
    );
  });

  it('renders all data perfactly..', () => {
    const txt_name = screen.getByTestId('User0_txtName');
    const txt_role = screen.getByTestId('User0_txtRole');

    expect(txt_name).toHaveTextContent('mahendra');
    expect(txt_role).toHaveTextContent('Admin');
  });

  it('I can press to card for call method callback ...', () => {
    const callbackButton = screen.getByTestId('User0_btnNavigate');
    fireEvent(callbackButton, 'press');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
