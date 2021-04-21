import {
  customerAddressesFragment,
  customerDetailsFragment,
  customerFragment
} from "@saleor/fragments/customers";
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
  ${customerFragment}
  query ListCustomers(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: CustomerFilterInput
    $sort: UserSortingInput
  ) {
    customers(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...CustomerFragment
          orders {
            totalCount
          }
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
  ${customerDetailsFragment}
  query CustomerDetails($id: ID!) {
    user(id: $id) {
      ...CustomerDetailsFragment
      orders(last: 5) {
        edges {
          node {
            id
            created
            number
            paymentStatus
            total {
              gross {
                currency
                amount
              }
            }
          }
        }
      }
      lastPlacedOrder: orders(last: 1) {
        edges {
          node {
            id
            created
          }
        }
      }
    }
  }
`;
export const TypedSupplierDetailsQuery = TypedQuery<
  SupplierDetails,
  SupplierDetailsVariables
>(supplierDetails);

const supplierAddresses = gql`
  ${customerAddressesFragment}
  query CustomerAddresses($id: ID!) {
    user(id: $id) {
      ...CustomerAddressesFragment
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
