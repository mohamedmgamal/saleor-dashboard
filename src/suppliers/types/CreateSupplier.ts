/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserCreateInput, AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSupplier
// ====================================================

export interface CreateSupplier_SupplierCreate_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  massage:string | null ;
  field: string | null;
}

export interface CreateSupplier_SupplierCreate_user {
  __typename: "User";
  id: string;
}

export interface CreateSupplier_SupplierCreate {
  __typename: "SupplierCreate";
  errors: CreateSupplier_SupplierCreate_errors[];
  supplier: CreateSupplier_SupplierCreate_user | null;
}

export interface CreateSupplier {
  SupplierCreate: CreateSupplier_SupplierCreate | null;
}

export interface CreateSupplierVariables {
  input: UserCreateInput;
}
