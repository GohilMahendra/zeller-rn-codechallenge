import { render } from '@testing-library/react-native';
import CustomerEmptyList from '../../../src/components/user/CustomerEmptyList';

describe('CustomerEmptyList component....', () => {
  it('renders empty component perfectly', () => {
    const screen = render(<CustomerEmptyList />);
    expect(screen).toBeDefined();
  });
});
