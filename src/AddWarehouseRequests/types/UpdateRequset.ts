/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NewProductInput, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateWareHouseManger
// ====================================================

export interface UpdateNewProduct_NewProductUpdate_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;

}

export interface UpdateNewProduct_NewProductUpdate_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}
export interface UpdateNewWarehouse_NewWarehouseUpdate_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateJoined: any;
  lastLogin: any | null;
  note: string | null;
  isActive: boolean;
  phone:string;
}

export interface UpdateNewProduct_NewProductUpdate {
  __typename: "NewProductUpdate";
  errors: UpdateNewProduct_NewProductUpdate_errors[];
  NewProduct: UpdateNewWarehouse_NewWarehouseUpdate_user | null;
}

export interface UpdateWarehouse {
  changeStatusAddWarehouse: UpdateNewProduct_NewProductUpdate | null;
}

export interface UpdateNewWarehouseVariables {
  input: NewProductInput;
}
