/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SupplierCreateData
// ====================================================

export interface SupplierCreateData_shop_countries {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface SupplierCreateData_shop {
  __typename: "Shop";
  countries: SupplierCreateData_shop_countries[];
}

export interface SupplierCreateData {
  shop: SupplierCreateData_shop;
}
