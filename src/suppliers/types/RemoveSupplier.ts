/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveSupplier
// ====================================================

export interface RemoveSupplier_SupplierDelete_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;
}

export interface RemoveSupplier_SupplierDelete {
  __typename: "SupplierDelete";
  errors: RemoveSupplier_SupplierDelete_errors[];
}

export interface RemoveSupplier {
  customerDelete: RemoveSupplier_SupplierDelete | null;
}

export interface RemoveSupplierVariables {
  id: string;
}
