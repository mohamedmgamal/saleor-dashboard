/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkRemoveSuppliers
// ====================================================

export interface BulkRemoveSuppliers_SupplierBulkDelete_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  field: string | null;
}

export interface BulkRemoveSuppliers_SupplierBulkDelete {
  __typename: "SupplierBulkDelete";
  errors: BulkRemoveSuppliers_SupplierBulkDelete_errors[];
}

export interface BulkRemoveWarehouseManger {
  SupplierBulkDelete: BulkRemoveSuppliers_SupplierBulkDelete | null;
}

export interface BulkRemoveSuppliersVariables {
  ids: (string | null)[];
}
