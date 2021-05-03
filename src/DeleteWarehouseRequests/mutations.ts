import {
  accountErrorFragment,
  supplierErrorFragment
} from "@saleor/fragments/errors";
import { deleteWarehousesFragment } from "@saleor/fragments/RequestDeleteWarehouse";
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
  UpdateRequest,
  UpdateRequestVariables
} from "./types/DeleteRequestDetails";
import {
  RemoveSupplier,
  RemoveSupplierVariables
} from "./types/RemoveSupplier";

const updateRequest = gql`
  ${supplierErrorFragment}
  ${deleteWarehousesFragment}
  mutation changeStatusDeleteWarehouse($input: ChangeStatusInput!) {
    changeStatusDeleteWarehouse(input: $input) {
      errors: supplierError {
        ...supplierError
      }
      request {
        ...deleteWarehousesFragment
      }
    }
  }
`;
export const TypedUpdateRequestMutation = TypedMutation<
  UpdateRequest,
  UpdateRequestVariables
>(updateRequest);

const createSupplier = gql`
  ${supplierErrorFragment}
  mutation supplierCreate($input: SupplierCreateInput!) {
    supplierCreate(input: $input) {
      errors: supplierError {
        ...supplierErrorFragment
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
