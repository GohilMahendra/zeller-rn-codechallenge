import { render } from '@testing-library/react-native';
import CustomerEmptyList from '../../../src/components/user/CustomerEmptyList';

describe('CustomerEmptyList component....', () => {
  it('renders empty component perfectly', () => {
    const screen = render(<CustomerEmptyList testID={'Home_ListEmpty'} />);
    expect(screen).toBeDefined();
  });
  it('renders empty text perfectly', () => {
    const screen = render(<CustomerEmptyList testID={'Home_ListEmpty'} />);
    const textEmpty = screen.getByTestId('Home_ListEmpty_txtEmptyText');
    expect(textEmpty).toHaveTextContent('No Users Found');
  });
});
