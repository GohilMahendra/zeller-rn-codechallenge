import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useZellerCustomers } from '../../src/hooks/useZellerCustomers';
import {
  errorQueryMock,
  mockCustomers,
  mocks,
  searchQuaryMock,
} from '../mocks';

export const createMockWrapper = (mocks: MockedResponse[]) => {
  return ({ children }: { children: React.ReactNode }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

describe('useZellerCustomers hook....', () => {
  it('fetches the customers', async () => {
    const { waitForNextUpdate, result } = renderHook(
      () => useZellerCustomers(),
      { wrapper: createMockWrapper(mocks) },
    );

    await waitForNextUpdate();

    expect(result.current.customers).toEqual(mockCustomers);
    expect(result.current.loading).toBeFalsy();
  });

  it('fetches the customers with Manager Role', async () => {
    const { waitForNextUpdate, result } = renderHook(
      () => useZellerCustomers(),
      { wrapper: createMockWrapper([...mocks, ...searchQuaryMock]) },
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
        wrapper: createMockWrapper(errorQueryMock),
      },
    );

    await waitForNextUpdate();

    expect(result.current.error?.message).toBe(
      'Something went wrong fetching customers',
    );
    expect(result.current.loading).toBeFalsy();
  });
});
