/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AuthorizationKeyInput, AuthorizationKeyType, ShopErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthorizationKeyAdd
// ====================================================

export interface AuthorizationKeyAdd_authorizationKeyAdd_errors {
  __typename: "ShopError";
  code: ShopErrorCode;
  field: string | null;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_authorizationKeys {
  __typename: "AuthorizationKey";
  key: string;
  name: AuthorizationKeyType;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress {
  __typename: "Address";
  city: string;
  governorate:string;
  cityArea: string;
  companyName: string;
  country: AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_countries {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_domain {
  __typename: "Domain";
  host: string;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop {
  __typename: "Shop";
  authorizationKeys: (AuthorizationKeyAdd_authorizationKeyAdd_shop_authorizationKeys | null)[];
  companyAddress: AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress | null;
  countries: AuthorizationKeyAdd_authorizationKeyAdd_shop_countries[];
  customerSetPasswordUrl: string | null;
  defaultMailSenderAddress: string | null;
  defaultMailSenderName: string | null;
  description: string | null;
  domain: AuthorizationKeyAdd_authorizationKeyAdd_shop_domain;
  name: string;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd {
  __typename: "AuthorizationKeyAdd";
  errors: AuthorizationKeyAdd_authorizationKeyAdd_errors[];
  shop: AuthorizationKeyAdd_authorizationKeyAdd_shop | null;
}

export interface AuthorizationKeyAdd {
  authorizationKeyAdd: AuthorizationKeyAdd_authorizationKeyAdd | null;
}

export interface AuthorizationKeyAddVariables {
  input: AuthorizationKeyInput;
  keyType: AuthorizationKeyType;
}
