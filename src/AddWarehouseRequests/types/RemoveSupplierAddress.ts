/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveSupplierAddress
// ====================================================

export interface RemoveSupplierAddress_addressDelete_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;
}

export interface RemoveSupplierAddress_addressDelete_user_addresses_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface RemoveSupplierAddress_addressDelete_user_addresses {
  __typename: "Address";
  city: string;
  governorate:string;
  cityArea: string;
  companyName: string;
  country: RemoveSupplierAddress_addressDelete_user_addresses_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface RemoveSupplierAddress_addressDelete_user_defaultBillingAddress {
  __typename: "Address";
  id: string;
}

export interface RemoveSupplierAddress_addressDelete_user_defaultShippingAddress {
  __typename: "Address";
  id: string;
}

export interface RemoveSupplierAddress_addressDelete_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: (RemoveSupplierAddress_addressDelete_user_addresses | null)[] | null;
  defaultBillingAddress: RemoveSupplierAddress_addressDelete_user_defaultBillingAddress | null;
  defaultShippingAddress: RemoveSupplierAddress_addressDelete_user_defaultShippingAddress | null;
}

export interface RemoveSupplierAddress_addressDelete {
  __typename: "AddressDelete";
  errors: RemoveSupplierAddress_addressDelete_errors[];
  user: RemoveSupplierAddress_addressDelete_user | null;
}

export interface RemoveSupplierAddress {
  addressDelete: RemoveSupplierAddress_addressDelete | null;
}

export interface RemoveSupplierAddressVariables {
  id: string;
}
