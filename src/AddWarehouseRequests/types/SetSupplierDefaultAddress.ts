/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressTypeEnum, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SetSupplierDefaultAddress
// ====================================================

export interface SetSupplierDefaultAddress_addressSetDefault_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;
}

export interface SetSupplierDefaultAddress_addressSetDefault_user_addresses_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface SetSupplierDefaultAddress_addressSetDefault_user_addresses {
  __typename: "Address";
  city: string;
  governorate:string;
  cityArea: string;
  companyName: string;
  country: SetSupplierDefaultAddress_addressSetDefault_user_addresses_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SetSupplierDefaultAddress_addressSetDefault_user_defaultBillingAddress {
  __typename: "Address";
  id: string;
}

export interface SetSupplierDefaultAddress_addressSetDefault_user_defaultShippingAddress {
  __typename: "Address";
  id: string;
}

export interface SetSupplierDefaultAddress_addressSetDefault_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: (SetSupplierDefaultAddress_addressSetDefault_user_addresses | null)[] | null;
  defaultBillingAddress: SetSupplierDefaultAddress_addressSetDefault_user_defaultBillingAddress | null;
  defaultShippingAddress: SetSupplierDefaultAddress_addressSetDefault_user_defaultShippingAddress | null;
}

export interface SetSupplierDefaultAddress_addressSetDefault {
  __typename: "AddressSetDefault";
  errors: SetSupplierDefaultAddress_addressSetDefault_errors[];
  user: SetSupplierDefaultAddress_addressSetDefault_user | null;
}

export interface SetSupplierDefaultAddress {
  addressSetDefault: SetSupplierDefaultAddress_addressSetDefault | null;
}

export interface SetSupplierDefaultAddressVariables {
  addressId: string;
  userId: string;
  type: AddressTypeEnum;
}
