import {deleteWarehousesFragment} from '@saleor/fragments/RequestDeleteWarehouse'
import {
  supplierDetailsFragment,
} from "@saleor/fragments/suppliers";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import {
  DeleteRequestDetails,
  RequestDetailsVariables
} from "./types/DeleteRequestDetails";
import { ListRequestDeleteWarehouse, ListRequestDeleteWarehouseVariables } from "./types/RequesstDeleteWarehouse";
import {
  SupplierAddresses,
  SupplierAddressesVariables
} from "./types/SupplierAddresses";
import { SupplierCreateData } from "./types/SupplierCreateData";

const deleteWarehousesList = gql`
  ${deleteWarehousesFragment}
  query requestsDeleteWarehouse(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: RequestExistProductFilterInput
      ) {
    requestsDeleteWarehouse(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
    ) {
      edges {
        node {
          ...deleteWarehousesFragment
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
export const usesDeleteWarehousesListListQuery = makeQuery<
  ListRequestDeleteWarehouse,
  ListRequestDeleteWarehouseVariables
>(deleteWarehousesList);


const usesRequestDetails = gql`
  query requestDeleteWarehouse($id: ID!) {
    requestDeleteWarehouse(id: $id) {
      id
        status
        createdAt
        updatedAt
        warehouse{
          name
          companyName
          address{
            streetAddress1
            country
            {
              country
            }
            governorate
            city
            cityArea
          }
        }
        supplier{
          firstName
          lastName
          phone
        }
    }
  }
`;
export const TypedRequestDetailsQuery = TypedQuery<
  DeleteRequestDetails,
  RequestDetailsVariables
>(usesRequestDetails);




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
