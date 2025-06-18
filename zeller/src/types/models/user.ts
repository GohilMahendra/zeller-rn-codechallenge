export interface ZellerCustomer {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface ZellerCustomerConnection {
  items: ZellerCustomer[];
  nextToken?: string | null;
}

export interface TableStringFilterInput {
  ne?: string;
  eq?: string;
  le?: string;
  lt?: string;
  ge?: string;
  gt?: string;
  contains?: string;
  notContains?: string;
  between?: [string, string];
  beginsWith?: string;
}

export interface TableZellerCustomerFilterInput {
  id?: TableStringFilterInput;
  name?: TableStringFilterInput;
  email?: TableStringFilterInput;
  role?: TableStringFilterInput;
}

export interface ListZellerCustomersQueryInput {
  filter?: TableZellerCustomerFilterInput;
  limit?: number;
  nextToken?: string;
}

export interface GetZellerCustomerQueryInput {
  id: string;
}

export type Role = 'Admin' | 'Manager';
