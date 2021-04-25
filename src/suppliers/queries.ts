import {
  supplierDetailsFragment,
  supplierFragment
} from "@saleor/fragments/suppliers";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { ListSuppliers, ListSuppliersVariables } from "./types/ListSuppliers";
import {
  SupplierAddresses,
  SupplierAddressesVariables
} from "./types/SupplierAddresses";
import { SupplierCreateData } from "./types/SupplierCreateData";
import {
  SupplierDetails,
  SupplierDetailsVariables
} from "./types/SupplierDetails";

const supplierList = gql`
  ${supplierFragment}
  query suppliers(
    $after: String
    $before: String
    $first: Int
    $last: Int
      ) {
    suppliers(
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...supplierFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
export const useSupplierListQuery = makeQuery<
  ListSuppliers,
  ListSuppliersVariables
>(supplierList);

const supplierDetails = gql`
  ${supplierDetailsFragment}
  query supplier($id: ID!) {
    supplier(id: $id) {
      ...SupplierDetailsFragment
    }
  }
`;
export const TypedSupplierDetailsQuery = TypedQuery<
  SupplierDetails,
  SupplierDetailsVariables
>(supplierDetails);
const supplierAddresses = gql`
  ${supplierDetailsFragment}
  query supplier($id: ID!) {
    supplier(id: $id) {
      ...supplierDetailsFragment
    }
  }
`;
export const TypedSupplierAddressesQuery = TypedQuery<
  SupplierAddresses,
  SupplierAddressesVariables
>(supplierAddresses);

const supplierCreateData = gql`
  query CustomerCreateData {
    shop {
      countries {
        code
        country
      }
    }
  }
`;
export const TypedSupplierCreateDataQuery = TypedQuery<SupplierCreateData, {}>(
  supplierCreateData
);
