import { fireEvent, render } from '@testing-library/react-native';
import { mockCustomers } from '../mocks';
import Home from '../../src/screens/Home';
import { Role } from '../../src/types/models/user';

// I use prefix ID mechenism where each component have mendatory testID
// the reason is my all component are free from logic and agnostic from state

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

// mocking directly hook as i am lazy,
// can be done same with mockProvider passing mock data
// but would be repitative as already done at hook level
// for E2E test i guess that would be better if you dont want to mess with DB

jest.mock('../../src/hooks/useZellerCustomers', () => ({
  __esModule: true,
  useZellerCustomers: () => mockUseZellerCustomers(),
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

  it('I can get Empty component if no data is coming gracefully', () => {
    mockUseZellerCustomers.mockReturnValueOnce({
      customers: [],
      loading: false,
      error: undefined,
      selectedRole: 'Admin' as Role,
      setSelectedRole: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      refetch: jest.fn(),
    });

    const screen = render(<Home />);
    const empty_text = screen.getByTestId('Home_ListEmpty_txtEmptyText');
    expect(empty_text).toHaveTextContent('No Users Found');
  });

  it('I can get not get Empty component if loader is spinning', () => {
    mockUseZellerCustomers.mockReturnValueOnce({
      customers: [],
      loading: true,
      error: undefined,
      selectedRole: 'Admin' as Role,
      setSelectedRole: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      refetch: jest.fn(),
    });

    const screen = render(<Home />);
    const empty_text = screen.queryByTestId('Home_ListEmpty_txtEmptyText');
    expect(empty_text).toBeNull();
  });
});
