export const MOCK_CUSTOMERS = [
    {
      id: '1',
      name: 'TestCustomer1',
      email: 'test1@test.com',
      role: 'Manager',
    },
    {
      id: '2',
      name: 'TestCustomer2',
      email: 'test2@test.com',
      role: 'Admin',
    },
    {
      id: '3',
      name: 'TestCustomer3',
      email: 'test3@test.com',
      role: 'Manager',
    },
    {
      id: '4',
      name: 'TestCustomer4',
      email: 'test4@test.com',
      role: 'Admin',
    },
  ];
  
  export const listZellerCustomers = (_, args) => {
    const { filter, limit = 10 } = args;
  
    let result = MOCK_CUSTOMERS;
  
    if (filter?.role?.eq) {
      result = result.filter((c) => c.role === filter.role.eq);
    } else if (filter?.role?.contains) {
      result = result.filter((c) =>
        c.role.toLowerCase().includes(filter.role.contains.toLowerCase())
      );
    }
  
    return {
      items: result.slice(0, limit),
      nextToken: null,
    };
  };
  