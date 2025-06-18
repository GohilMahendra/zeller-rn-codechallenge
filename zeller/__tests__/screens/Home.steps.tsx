import { fireEvent, render } from '@testing-library/react-native';
import { useZellerCustomers } from '../../src/hooks/useZellerCustomers';
import { mockCustomers, mocks, searchQuaryMock } from '../mocks';
import Home from '../../src/screens/Home';
import { MockedProvider } from '@apollo/client/testing';
import { Role } from '../../src/types/models/user';

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

const mockUseZellerCustomers = jest.fn();

jest.mock('../../src/hooks/useZellerCustomers', () => ({
  __esModule: true,
  useZellerCustomers: () => ({
    customers: mockCustomers,
    loading: false,
    error: undefined,
    selectedRole: 'Admin',
    setSelectedRole: jest.fn(),
    searchTerm: '',
    setSearchTerm: jest.fn(),
    refetch: jest.fn(),
  }),
}));

describe('Home component..', () => {
  it('renders the home', async () => {
    mockUseZellerCustomers.mockReturnValueOnce({
      customers: mockCustomers,
      loading: false,
      error: undefined,
      selectedRole: 'Admin' as Role,
      setSelectedRole: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      refetch: jest.fn(),
    });
    const screen = render(<Home />);
    expect(screen).toBeTruthy();
  });
  it('I can search and filter by role and name', () => {
    mockUseZellerCustomers.mockReturnValueOnce({
      customers: mockCustomers.filter(item => item.name == 'jay'),
      loading: false,
      error: undefined,
      selectedRole: 'Admin' as Role,
      setSelectedRole: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      refetch: jest.fn(),
    });
    const screen = render(<Home />);
    const input = screen.getByTestId('Home_inputSearch');
    fireEvent(input, 'changeText', 'jay');
  });
  it('I can change the role and will get result', async () => {
    mockUseZellerCustomers.mockReturnValueOnce({
      customers: mockCustomers.filter(item => item.role == 'Manager'),
      loading: false,
      error: undefined,
      selectedRole: 'Admin' as Role,
      setSelectedRole: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      refetch: jest.fn(),
    });
    const screen = render(<Home />);
    const btnManagerRadio = screen.getByTestId(
      'Home_RoleManager_btnSelectRole',
    );
    fireEvent(btnManagerRadio, 'press');

    const customer_listWrapper = await screen.findByTestId(
      'UserItem2_btnNavigate',
    );
    const customer_txtName = await screen.findByTestId('UserItem2_txtName');
    const customer_txtRole = await screen.findByTestId('UserItem2_txtRole');

    expect(customer_listWrapper).toBeDefined();
    expect(customer_txtName).toHaveTextContent('akash');
    expect(customer_txtRole).toHaveTextContent('Manager');
  });

  it('I can navigate to next screen on pressing listItem', async () => {
    mockUseZellerCustomers.mockReturnValueOnce({
      customers: mockCustomers.filter(item => item.role == 'Manager'),
      loading: false,
      error: undefined,
      selectedRole: 'Admin' as Role,
      setSelectedRole: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      refetch: jest.fn(),
    });
    const screen = render(<Home />);
    const btnManagerRadio = screen.getByTestId(
      'Home_RoleManager_btnSelectRole',
    );
    fireEvent(btnManagerRadio, 'press');

    const customer_listWrapper = await screen.findByTestId(
      'UserItem2_btnNavigate',
    );

    fireEvent(customer_listWrapper, 'press');

    const mockNavigteUser = mockCustomers.filter(
      item => item.role == 'Manager',
    )[0];
    expect(mockNavigate).toHaveBeenCalledWith('Customer', {
      user: mockNavigteUser,
    });
  });

  it('I can do pull to refresh on list', () => {
    mockUseZellerCustomers.mockReturnValueOnce({
      customers: mockCustomers,
      loading: false,
      error: undefined,
      selectedRole: 'Admin' as Role,
      setSelectedRole: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      refetch: jest.fn(),
    });
    const screen = render(<Home />);
    // used `mocked-refresh-control` as TestID as tempory refresh ID issue
    const refreshList = screen.getByTestId('mocked-refresh-control');
    fireEvent(refreshList, 'refresh');
    const list_items = screen.getByTestId('Home_ListCustomers');
    expect(list_items.props.data.length).toBe(mockCustomers.length);
  });
});
