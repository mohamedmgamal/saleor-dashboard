import { supplierErrorFragment } from "@saleor/fragments/errors";
import { newWarehousesFragment } from "@saleor/fragments/RequestNewWareHouses.ts";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  UpdateNewWarehouseVariables,
  UpdateWarehouse
} from "./types/UpdateRequset";

const updateNewProduct = gql`
  ${supplierErrorFragment}
  ${newWarehousesFragment}
  mutation changeStatusAddWarehouse($input: ChangeStatusInput!) {
    changeStatusAddWarehouse(input: $input) {
      errors: supplierError {
        ...supplierError
      }
      request {
        ...newWarehousesFragment
      }
    }
  }
`;
export const TypedUpdateNewProductMutation = TypedMutation<
  UpdateWarehouse,
  UpdateNewWarehouseVariables
>(updateNewProduct);
const deletee = gql`
  ${supplierErrorFragment}
  ${newWarehousesFragment}
  mutation changeStatusAddWarehouse($input: ChangeStatusInput!) {
    changeStatusAddWarehouse(input: $input) {
      errors: supplierErrors {
        ...supplierErrorFragment
      }
      request {
        ...newWarehousesFragment
      }
    }
  }
`;
export const TypedBulkRemoveSuppliers = TypedMutation<
  UpdateWarehouse,
  UpdateNewWarehouseVariables
>(deletee);
