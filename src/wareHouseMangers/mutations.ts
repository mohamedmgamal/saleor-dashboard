 import { fragmentAddress } from "@saleor/fragments/address";
import {
  customerAddressesFragment,
  supplierDetailsFragment
} from "@saleor/fragments/suppliers";
import { accountErrorFragment } from "@saleor/fragments/errors";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  BulkRemoveWarehouseManger,
  BulkRemoveSuppliersVariables
} from "./types/BulkRemoveWarehouseManger";
import {
  CreateWarehouseManager,
  CreateWarehouseManagerVariables
} from "./types/CreateWarehouseManager";
import {
  CreateSupplierAddress,
  CreateSupplierAddressVariables
} from "./types/CreateSupplierAddress";
import {
  RemoveSupplier,
  RemoveSupplierVariables
} from "./types/RemoveSupplier";
import {
  RemoveSupplierAddress,
  RemoveSupplierAddressVariables
} from "./types/RemoveSupplierAddress";
import {
  SetSupplierDefaultAddress,
  SetSupplierDefaultAddressVariables
} from "./types/SetSupplierDefaultAddress";
import {
  UpdateWareHouseManger,
  UpdateSupplierVariables
} from "./types/UpdateWareHouseManger";
import {
  UpdateSupplierAddress,
  UpdateSupplierAddressVariables
} from "./types/UpdateSupplierAddress";

const updateSupplier = gql`
  ${accountErrorFragment}
  ${supplierDetailsFragment}
  mutation supplierUpdate($id: ID!, $input: SupplierUpdateInput!) {
    supplierUpdate(id: $id, input: $input) {
      errors : accountErrors {
        ...AccountErrorFragment
      }
      supplier {
       ...SupplierDetailsFragment
      }
    }
  }
`;
export const TypedUpdateSupplierMutation = TypedMutation<
  UpdateWareHouseManger,
  UpdateSupplierVariables
>(updateSupplier);

const createWarehouseManager = gql`
  ${accountErrorFragment}
  mutation warehouseManagerCreate($input: WarehouseManagerCreateInput!) {
    warehouseManagerCreate(input: $input) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      warehouseManager {
        id
      }
    }
  }
`;
export const TypedCreateWarehouseManagerMutation = TypedMutation<
  CreateWarehouseManager,
  CreateWarehouseManagerVariables
>(createWarehouseManager);

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

const setSupplierDefaultAddress = gql`
  ${accountErrorFragment}
  ${customerAddressesFragment}
  mutation SetCustomerDefaultAddress(
    $addressId: ID!
    $userId: ID!
    $type: AddressTypeEnum!
  ) {
    addressSetDefault(addressId: $addressId, userId: $userId, type: $type) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
`;
export const TypedSetSupplierDefaultAddressMutation = TypedMutation<
  SetSupplierDefaultAddress,
  SetSupplierDefaultAddressVariables
>(setSupplierDefaultAddress);

const createSupplierAddress = gql`
  ${accountErrorFragment}
  ${customerAddressesFragment}
  ${fragmentAddress}
  mutation CreateCustomerAddress($id: ID!, $input: AddressInput!) {
    addressCreate(userId: $id, input: $input) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      address {
        ...AddressFragment
      }
      user {
        ...CustomerAddressesFragment
      }
    }
  }
`;
export const TypedCreateSupplierAddressMutation = TypedMutation<
  CreateSupplierAddress,
  CreateSupplierAddressVariables
>(createSupplierAddress);

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
  ${customerAddressesFragment}
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
  BulkRemoveWarehouseManger,
  BulkRemoveSuppliersVariables
>(bulkRemoveSupplier);
