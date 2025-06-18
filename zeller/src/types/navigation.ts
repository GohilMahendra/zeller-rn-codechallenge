import { ParamListBase } from '@react-navigation/native';
import { ZellerCustomer } from './models/user';

export interface RootStackParams extends ParamListBase {
  Home: undefined;
  Customer: {
    user: ZellerCustomer;
  };
}
