import {
  accountErrorFragment,
  supplierErrorFragment
} from "@saleor/fragments/errors";
import { existingProductsFragment } from "@saleor/fragments/existingProduct";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  BulkRemoveSupplier,
  BulkRemoveSuppliersVariables
} from "./types/BulkRemoveSupplier";
import {
  CreateSupplier,
  CreateSupplierVariables
} from "./types/CreateSupplier";
import {
  UpdateExistingProduct,
  UpdateExistingProductVariables
} from "./types/ExistingProductDetails";
import {
  RemoveSupplier,
  RemoveSupplierVariables
} from "./types/RemoveSupplier";

const updateExist = gql`
  ${supplierErrorFragment}
  ${existingProductsFragment}
  mutation changeStatusExistProduct($input: ChangeStatusInput!) {
    changeStatusExistProduct(input: $input) {
      errors: supplierError {
        ...supplierError
      }
      request {
        ...existingProductsFragment
      }
    }
  }
`;
export const TypedUpdateSupplierMutation = TypedMutation<
  UpdateExistingProduct,
  UpdateExistingProductVariables
>(updateExist);

const createSupplier = gql`
  ${accountErrorFragment}
  mutation supplierCreate($input: SupplierCreateInput!) {
    supplierCreate(input: $input) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      supplier {
        id
      }
    }
  }
`;
export const TypedCreateSupplierMutation = TypedMutation<
  CreateSupplier,
  CreateSupplierVariables
>(createSupplier);

const removeSupplier = gql`
  ${accountErrorFragment}
  mutation RemoveCustomer($id: ID!) {
    customerDelete(id: $id) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const TypedRemoveSupplierMutation = TypedMutation<
  RemoveSupplier,
  RemoveSupplierVariables
>(removeSupplier);

export const bulkRemoveSupplier = gql`
  ${accountErrorFragment}
  mutation BulkRemoveCustomers($ids: [ID]!) {
    customerBulkDelete(ids: $ids) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const TypedBulkRemoveSuppliers = TypedMutation<
  BulkRemoveSupplier,
  BulkRemoveSuppliersVariables
>(bulkRemoveSupplier);
