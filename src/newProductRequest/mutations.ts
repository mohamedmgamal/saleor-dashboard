import { fragmentAddress } from "@saleor/fragments/address";
import { supplierErrorFragment } from "@saleor/fragments/errors";
import { newProductsFragment } from "@saleor/fragments/newProduc";
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
  RemoveSupplier,
  RemoveSupplierVariables
} from "./types/RemoveSupplier";
import {
  RemoveSupplierAddress,
  RemoveSupplierAddressVariables
} from "./types/RemoveSupplierAddress";
import {
  UpdateNewProduct,
  UpdateNewProductVariables
} from "./types/UpdateSupplier";
import {
  UpdateSupplierAddress,
  UpdateSupplierAddressVariables
} from "./types/UpdateSupplierAddress";

const updateNewProduct = gql`
  ${supplierErrorFragment}
  ${newProductsFragment}
  mutation changeStatusNewProduct($input: ChangeStatusInput!) {
    changeStatusNewProduct(input: $input) {
      errors: supplierError {
        ...supplierError
      }
      request {
        ...newProductsFragment
      }
    }
  }
`;
export const TypedUpdateNewProductMutation = TypedMutation<
  UpdateNewProduct,
  UpdateNewProductVariables
>(updateNewProduct);

const createSupplier = gql`
  ${supplierErrorFragment}
  mutation supplierCreate($input: SupplierCreateInput!) {
    supplierCreate(input: $input) {
      errors: supplierError {
        ...supplierError
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
  ${supplierErrorFragment}
  mutation RemoveCustomer($id: ID!) {
    customerDelete(id: $id) {
      errors: supplierError {
        ...supplierError
      }
    }
  }
`;
export const TypedRemoveSupplierMutation = TypedMutation<
  RemoveSupplier,
  RemoveSupplierVariables
>(removeSupplier);

const updateSupplierAddress = gql`
  ${supplierErrorFragment}
  ${fragmentAddress}
  mutation UpdateCustomerAddress($id: ID!, $input: AddressInput!) {
    addressUpdate(id: $id, input: $input) {
      errors: supplierError {
        ...supplierError
      }
      address {
        ...AddressFragment
      }
    }
  }
`;
export const TypedUpdateSupplierAddressMutation = TypedMutation<
  UpdateSupplierAddress,
  UpdateSupplierAddressVariables
>(updateSupplierAddress);

const removeSupplierAddress = gql`
  ${supplierErrorFragment}
  ${newProductsFragment}
  mutation RemoveCustomerAddress($id: ID!) {
    addressDelete(id: $id) {
      errors: supplierError {
        ...supplierError
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
`;
export const TypedRemoveSupplierAddressMutation = TypedMutation<
  RemoveSupplierAddress,
  RemoveSupplierAddressVariables
>(removeSupplierAddress);

export const bulkRemoveSupplier = gql`
  ${supplierErrorFragment}
  mutation BulkRemoveCustomers($ids: [ID]!) {
    customerBulkDelete(ids: $ids) {
      errors: supplierError {
        ...supplierError
      }
    }
  }
`;
export const TypedBulkRemoveSuppliers = TypedMutation<
  BulkRemoveSupplier,
  BulkRemoveSuppliersVariables
>(bulkRemoveSupplier);
