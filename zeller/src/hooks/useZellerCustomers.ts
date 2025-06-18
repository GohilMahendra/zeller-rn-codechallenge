import { useLazyQuery } from '@apollo/client';
import { useEffect, useState, useCallback } from 'react';
import { LIST_ZELLER_CUSTOMERS } from '../graphql/user/queries';
import {
  ListZellerCustomersQueryInput,
  Role,
  ZellerCustomer,
  ZellerCustomerConnection,
} from '../types/models/user';

export const useZellerCustomers = () => {
  const [selectedRole, setSelectedRole] = useState<Role>('Admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<ZellerCustomer[]>([]);

  const [fetchCustomers, { loading, error }] = useLazyQuery<
    { listZellerCustomers: ZellerCustomerConnection },
    ListZellerCustomersQueryInput
  >(LIST_ZELLER_CUSTOMERS);

  const getData = useCallback(async () => {
    try {
      const response = await fetchCustomers({
        variables: {
          limit: 10,
          filter: {
            role: {
              eq: selectedRole,
            },
            ...(searchTerm && {
              name: {
                contains: searchTerm,
              },
            }),
          },
        },
      });
      const items = response.data?.listZellerCustomers.items || [];
      setData(items);
    } catch (e) {
      console.error('Failed to fetch customers', e);
    }
  }, [fetchCustomers, selectedRole, searchTerm]);

  useEffect(() => {
    getData();
  }, [selectedRole, searchTerm]);

  return {
    customers: data,
    loading,
    error,
    selectedRole,
    setSelectedRole,
    searchTerm,
    setSearchTerm,
    refetch: getData,
  };
};
