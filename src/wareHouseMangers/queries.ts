import {
  wareHouseMangersFragment,
 // wareHouseMangersDetailsFragment
} from "@saleor/fragments/wareHouseMangers";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { ListWareHouseMangers, ListwareHouseMangersVariables } from "./types/ListWareHouseMangers";
import { SupplierCreateData } from "./types/SupplierCreateData";
import {
  WareHouseMangerDetails,
 WareHouseMangerDetailsVariables
} from "./types/WareHouseMangerDetails";
const WareHouseMangersList = gql`
  ${wareHouseMangersFragment}
  query warehouseManagers(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: WarehouseManagerFilterInput
      ) {
    warehouseManagers(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
    ) {
      edges {
        node {
          ...wareHouseMangersFragment
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
export const useWareHouseMangersListQuery = makeQuery<
  ListWareHouseMangers,
  ListwareHouseMangersVariables
>(WareHouseMangersList);



const wareHouseMangerDetails = gql`
  query warehouseManager($id: ID!) {
    warehouseManager(id: $id) {
      id
    supplier{
      firstName
      lastName
    }
    email
    dateJoined
    note
    isActive
    phone
    firstName
    lastName
    supplierId
    }
  }
`;
export const TypedWarehouseMangerDetailsQuery = TypedQuery<
  WareHouseMangerDetails,
  WareHouseMangerDetailsVariables
>(wareHouseMangerDetails);
// const supplierAddresses = gql`
//   ${supplierDetailsFragment}
//   query supplier($id: ID!) {
//     supplier(id: $id) {
//       ...supplierDetailsFragment
//     }
//   }
// `;
// export const TypedSupplierAddressesQuery = TypedQuery<
//   NewProduct,
//   SupplierAddressesVariables
// >(supplierAddresses);

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
