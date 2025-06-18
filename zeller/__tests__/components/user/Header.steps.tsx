import { screen, render, fireEvent } from '@testing-library/react-native';
import Header from '../../../src/components/user/Header';

const mockBackPress = jest.fn();

describe('Header Component...', () => {
  beforeEach(() => {
    render(
      <Header
        testID={'TestHeader'}
        title={'Mahendra'}
        onBackPress={mockBackPress}
      />,
    );
  });
  it('I can see the title of current user', () => {
    const titleText = screen.getByTestId('TestHeader_txtTitle');
    expect(titleText).toHaveTextContent('Mahendra');
  });

  it('I can show the title of current user', () => {
    const backButton = screen.getByTestId('TestHeader_btnBack');
    fireEvent(backButton, 'press');
    expect(mockBackPress).toHaveBeenCalled();
  });
});
