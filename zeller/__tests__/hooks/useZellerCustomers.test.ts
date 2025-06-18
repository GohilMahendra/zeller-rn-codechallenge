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
    __typename: 'ZellerCustomer',
  },
  {
    id: '2',
    name: 'akash',
    email: 'akash@example.com',
    role: 'Manager',
    __typename: 'ZellerCustomer',
  },
  {
    id: '3',
    name: 'mars',
    email: 'mars@example.com',
    role: 'Manager',
    __typename: 'ZellerCustomer',
  },
  {
    id: '4',
    name: 'jay',
    email: 'jay@example.com',
    role: 'Manager',
    __typename: 'ZellerCustomer',
  },
  {
    id: '5',
    name: 'bob',
    email: 'bob@example.com',
    role: 'Admin',
    __typename: 'ZellerCustomer',
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



describe('useZellerCustomers hook', () => {
  it('fetches the customers', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider>
      </MockedProvider
    );
  });
});
