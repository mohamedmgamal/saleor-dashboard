/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewProduct
// ====================================================

export interface SupplierAddresses_user_addresses_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface SupplierAddresses_user_addresses {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: SupplierAddresses_user_addresses_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SupplierAddresses_user_defaultBillingAddress {
  __typename: "Address";
  id: string;
}

export interface SupplierAddresses_user_defaultShippingAddress {
  __typename: "Address";
  id: string;
}

export interface SupplierAddresses_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: (SupplierAddresses_user_addresses | null)[] | null;
  defaultBillingAddress: SupplierAddresses_user_defaultBillingAddress | null;
  defaultShippingAddress: SupplierAddresses_user_defaultShippingAddress | null;
}

export interface NewProduct {
  requestNewProduct: SupplierAddresses_user | null;
}

export interface SupplierAddressesVariables {
  id: string;
}
