/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ExistProductInput, AccountErrorCode } from "./../../types/globalTypes";

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

export interface UpdateNewProduct_NewProductUpdate_user_defaultShippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  governorate:string;
  companyName: string;
  country: UpdateNewProduct_NewProductUpdate_user_defaultShippingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface UpdateNewProduct_NewProductUpdate_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface UpdateNewProduct_NewProductUpdate_user_defaultBillingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  governorate:string;
  companyName: string;
  country: UpdateNewProduct_NewProductUpdate_user_defaultBillingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string ;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface UpdateNewProduct_NewProductUpdate_user {
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
  NewProduct: UpdateNewProduct_NewProductUpdate_user | null;
}

export interface UpdateExistProduct {
  changeStatusExistProduct: UpdateNewProduct_NewProductUpdate | null;
}

export interface UpdateExistingProductVariables {
  input: ExistProductInput;
}
