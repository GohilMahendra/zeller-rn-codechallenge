import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { useZellerCustomers } from '../../src/hooks/useZellerCustomers';
import {
  errorQueryMock,
  mockCustomers,
  mocks,
  searchQuaryMock,
} from '../mocks';

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
const errorWrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={errorQueryMock} addTypename={false}>
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

  it('Handle Error gracefully if Fails to load', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useZellerCustomers(),
      {
        wrapper: errorWrapper,
      },
    );

    await waitForNextUpdate();

    expect(result.current.error).toBeDefined();
    expect(result.current.loading).toBeFalsy();
  });
});
