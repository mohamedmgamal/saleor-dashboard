import { accountErrorFragment } from "@saleor/fragments/errors";
import {
  newWarehousesFragment
} from "@saleor/fragments/RequestNewWareHouses.ts";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  UpdateWarehouse,
  UpdateNewWarehouseVariables
} from "./types/UpdateRequset";

const updateNewProduct = gql`
  ${accountErrorFragment}
  ${newWarehousesFragment}
  mutation changeStatusAddWarehouse($input: ChangeStatusInput!) {
    changeStatusAddWarehouse(input: $input) {
      errors : accountErrors {
        ...AccountErrorFragment
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
  ${accountErrorFragment}
  ${newWarehousesFragment}
  mutation changeStatusAddWarehouse($input: ChangeStatusInput!) {
    changeStatusAddWarehouse(input: $input) {
      errors : accountErrors {
        ...AccountErrorFragment
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

