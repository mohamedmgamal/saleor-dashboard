import { fragmentAddress } from "@saleor/fragments/address";
import { accountErrorFragment } from "@saleor/fragments/errors";
import {
  newProductsFragment
} from "@saleor/fragments/newProduc";
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
  ${accountErrorFragment}
  ${newProductsFragment}
  mutation changeStatusNewProduct($input: ChangeStatusInput!) {
    changeStatusNewProduct(input: $input) {
      errors : accountErrors {
        ...AccountErrorFragment
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

const updateSupplierAddress = gql`
  ${accountErrorFragment}
  ${fragmentAddress}
  mutation UpdateCustomerAddress($id: ID!, $input: AddressInput!) {
    addressUpdate(id: $id, input: $input) {
      errors: accountErrors {
        ...AccountErrorFragment
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
  ${accountErrorFragment}
  ${newProductsFragment}
  mutation RemoveCustomerAddress($id: ID!) {
    addressDelete(id: $id) {
      errors: accountErrors {
        ...AccountErrorFragment
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
