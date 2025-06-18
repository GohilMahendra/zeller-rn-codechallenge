import { MockedProvider } from '@apollo/client/testing';
import { mocks } from '../mocks';
import { useNavigation } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import Home from '../../src/screens/Home';
import Customer from '../../src/screens/Customer';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

describe('Home Screen...', () => {
  it('renders list of all Admin by default', async () => {
    render(<Customer />, { wrapper });
  });
});
