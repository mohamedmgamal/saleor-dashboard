/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSupplierAddress
// ====================================================

export interface CreateSupplierAddress_addressCreate_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;
}

export interface CreateSupplierAddress_addressCreate_address_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface CreateSupplierAddress_addressCreate_address {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: CreateSupplierAddress_addressCreate_address_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface CreateSupplierAddress_addressCreate_user_addresses_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface CreateSupplierAddress_addressCreate_user_addresses {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: CreateSupplierAddress_addressCreate_user_addresses_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface CreateSupplierAddress_addressCreate_user_defaultBillingAddress {
  __typename: "Address";
  id: string;
}

export interface CreateSupplierAddress_addressCreate_user_defaultShippingAddress {
  __typename: "Address";
  id: string;
}

export interface CreateSupplierAddress_addressCreate_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: (CreateSupplierAddress_addressCreate_user_addresses | null)[] | null;
  defaultBillingAddress: CreateSupplierAddress_addressCreate_user_defaultBillingAddress | null;
  defaultShippingAddress: CreateSupplierAddress_addressCreate_user_defaultShippingAddress | null;
}

export interface CreateSupplierAddress_addressCreate {
  __typename: "AddressCreate";
  errors: CreateSupplierAddress_addressCreate_errors[];
  address: CreateSupplierAddress_addressCreate_address | null;
  user: CreateSupplierAddress_addressCreate_user | null;
}

export interface CreateSupplierAddress {
  addressCreate: CreateSupplierAddress_addressCreate | null;
}

export interface CreateSupplierAddressVariables {
  id: string;
  input: AddressInput;
}
