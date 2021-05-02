/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WarehouseManagerUpdateInput, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateWareHouseManger
// ====================================================

export interface UpdateWarehouseManger_WarehouseMangerUpdate_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;

}

export interface UpdateWarehouseManger_WarehouseMangerUpdate_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateWarehouseManger_WarehouseMangerUpdate_user_defaultShippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: UpdateWarehouseManger_WarehouseMangerUpdate_user_defaultShippingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface UpdateWarehouseManger_WarehouseMangerUpdate_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateWarehouseManger_WarehouseMangerUpdate_user_defaultBillingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: UpdateWarehouseManger_WarehouseMangerUpdate_user_defaultBillingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string ;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface UpdateWarehouseManger_WarehouseMangerUpdate_user {
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

export interface UpdateWarehouseManger_WarehouseMangerUpdate {
  __typename: "WarehouseMangerUpdate";
  errors: UpdateWarehouseManger_WarehouseMangerUpdate_errors[];
  warehouseManger: UpdateWarehouseManger_WarehouseMangerUpdate_user | null;
}

export interface UpdateWareHouseManger {
  warehouseManagerUpdate: UpdateWarehouseManger_WarehouseMangerUpdate | null;
}

export interface UpdateWarehouseMangerVariables {
  id: string;
  input: WarehouseManagerUpdateInput;
}
