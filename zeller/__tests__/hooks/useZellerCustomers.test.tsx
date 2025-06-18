import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useZellerCustomers } from '../../src/hooks/useZellerCustomers';
import { LIST_ZELLER_CUSTOMERS } from '../../src/graphql/user/queries';

const mockCustomers = [
  {
    id: '1',
    name: 'mahendra',
    email: 'mahendra@example.com',
    role: 'Admin',
  },
  {
    id: '2',
    name: 'akash',
    email: 'akash@example.com',
    role: 'Manager',
  },
  {
    id: '3',
    name: 'mars',
    email: 'mars@example.com',
    role: 'Manager',
  },
  {
    id: '4',
    name: 'jay',
    email: 'jay@example.com',
    role: 'Admin',
  },
  {
    id: '5',
    name: 'bob',
    email: 'bob@example.com',
    role: 'Admin',
  },
];

const mocks: MockedResponse[] = [
  {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
      variables: {
        limit: 10,
        filter: {
          role: { eq: 'Admin' },
        },
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: mockCustomers,
          nextToken: null,
          __typename: 'ZellerCustomerConnection',
        },
      },
    },
  },
];

const searchQuaryMock: MockedResponse[] = [
  {
    request: {
      query: LIST_ZELLER_CUSTOMERS,
      variables: {
        limit: 10,
        filter: {
          name: { contains: 'jay' },
          role: { eq: 'Admin' },
        },
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: mockCustomers.filter(item => item.name.includes('jay')),
          nextToken: null,
          __typename: 'ZellerCustomerConnection',
        },
      },
    },
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

const searchWrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={searchQuaryMock} addTypename={false}>
    {children}
  </MockedProvider>
);

describe('useZellerCustomers hook', () => {
  it('fetches the customers', async () => {
    const { waitForNextUpdate, result } = renderHook(
      () => useZellerCustomers(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.customers).toEqual(mockCustomers);
    expect(result.current.loading).toBeFalsy();
  });

  it('fetches the customers with Manager Role', async () => {
    const { waitForNextUpdate, result } = renderHook(
      () => useZellerCustomers(),
      { wrapper: searchWrapper },
    );

    await waitForNextUpdate();

    act(() => {
      result.current.setSearchTerm('jay');
    });

    await waitForNextUpdate();

    expect(result.current.customers).toEqual(
      mockCustomers.filter(item => item.name.includes('jay')),
    );
    expect(result.current.loading).toBeFalsy();
  });
});
