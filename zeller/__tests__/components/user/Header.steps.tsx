import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../../src/components/user/Header';

const mockBackPress = jest.fn();

describe('Header Component...', () => {
  it('I can see the title of current user', () => {
    const screen = render(
      <Header
        testID={'TestHeader'}
        title={'Mahendra'}
        onBackPress={mockBackPress}
      />,
    );
    const titleText = screen.getByTestId('TestHeader_txtTitle');
    expect(titleText).toHaveTextContent('Mahendra');
  });

  it('I can pass the header without title too of current user', () => {
    const screen = render(
      <Header testID={'TestHeader'} onBackPress={mockBackPress} />,
    );
    const titleText = screen.getByTestId('TestHeader_txtTitle');
    expect(titleText).toHaveTextContent('');
  });

  it('I can show the title of current user', () => {
    const screen = render(
      <Header
        testID={'TestHeader'}
        title={'Mahendra'}
        onBackPress={mockBackPress}
      />,
    );
    const backButton = screen.getByTestId('TestHeader_btnBack');
    fireEvent(backButton, 'press');
    expect(mockBackPress).toHaveBeenCalled();
  });
});
