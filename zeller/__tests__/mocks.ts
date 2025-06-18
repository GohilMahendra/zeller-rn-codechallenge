import { MockedResponse } from '@apollo/client/testing';
import { LIST_ZELLER_CUSTOMERS } from '../src/graphql/user/queries';

export const mockCustomers = [
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

export const mocks: MockedResponse[] = [
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

export const searchQuaryMock: MockedResponse[] = [
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

export const errorQueryMock: MockedResponse[] = [
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
    error: new Error('Something went wrong fetching customers'),
  },
];
