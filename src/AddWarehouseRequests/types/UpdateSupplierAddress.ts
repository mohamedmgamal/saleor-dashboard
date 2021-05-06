/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddressInput, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSupplierAddress
// ====================================================

export interface UpdateSupplierAddress_addressUpdate_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;
}

export interface UpdateSupplierAddress_addressUpdate_address_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateSupplierAddress_addressUpdate_address {
  __typename: "Address";
  city: string;
  governorate:string;
  cityArea: string;
  companyName: string;
  country: UpdateSupplierAddress_addressUpdate_address_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface UpdateSupplierAddress_addressUpdate {
  __typename: "AddressUpdate";
  errors: UpdateSupplierAddress_addressUpdate_errors[];
  address: UpdateSupplierAddress_addressUpdate_address | null;
}

export interface UpdateSupplierAddress {
  addressUpdate: UpdateSupplierAddress_addressUpdate | null;
}

export interface UpdateSupplierAddressVariables {
  id: string;
  input: AddressInput;
}
