/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SupplierInput, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSupplier
// ====================================================

export interface UpdateSupplier_SupplierUpdate_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;
}

export interface UpdateSupplier_SupplierUpdate_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateSupplier_SupplierUpdate_user_defaultShippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: UpdateSupplier_SupplierUpdate_user_defaultShippingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface UpdateSupplier_SupplierUpdate_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateSupplier_SupplierUpdate_user_defaultBillingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: UpdateSupplier_SupplierUpdate_user_defaultBillingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface UpdateSupplier_SupplierUpdate_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateJoined: any;
  lastLogin: any | null;
  defaultShippingAddress: UpdateSupplier_SupplierUpdate_user_defaultShippingAddress | null;
  defaultBillingAddress: UpdateSupplier_SupplierUpdate_user_defaultBillingAddress | null;
  note: string | null;
  isActive: boolean;
}

export interface UpdateSupplier_SupplierUpdate {
  __typename: "SupplierUpdate";
  errors: UpdateSupplier_SupplierUpdate_errors[];
  user: UpdateSupplier_SupplierUpdate_user | null;
}

export interface UpdateSupplier {
  SupplierUpdate: UpdateSupplier_SupplierUpdate | null;
}

export interface UpdateSupplierVariables {
  id: string;
  input: SupplierInput;
}
