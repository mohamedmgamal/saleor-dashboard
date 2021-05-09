import { pageInfoFragment } from "@saleor/fragments/pageInfo";
import {
  warehouseDetailsFragment,
  warehouseWithShippingFragment
} from "@saleor/fragments/warehouses";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  WarehouseDetails,
  WarehouseDetailsVariables
} from "./types/WarehouseDetails";
import { WarehouseList, WarehouseListVariables } from "./types/WarehouseList";

const warehouseList = gql`
  ${warehouseWithShippingFragment}
  ${pageInfoFragment}
  query WarehouseList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: WarehouseFilterInput
    $sort: WarehouseSortingInput
  ) {
    warehouses(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...WarehouseWithShippingFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
export const useWarehouseList = makeQuery<
  WarehouseList,
  WarehouseListVariables
>(warehouseList);

const warehouseDetails = gql`
  ${warehouseDetailsFragment}
  query WarehouseDetails($id: ID!) {
    warehouse(id: $id) {
      ...WarehouseDetailsFragment
    }
  }
`;
export const useWarehouseDetails = makeQuery<
  WarehouseDetails,
  WarehouseDetailsVariables
>(warehouseDetails);

export const getGovernorates = gql`
  query addressValidationRules($countryCode: CountryCode!) {
    addressValidationRules(countryCode: $countryCode) {
       governorate{
      code
      nameAr
      nameEn
  }
    }
  }
`;

export const getCitesQ = gql`
  query addressValidationRules($countryCode: CountryCode!,$governorate: String!) {
    addressValidationRules(countryCode: $countryCode,governorate: $governorate) {
      city{
      code
      nameAr
      nameEn
    }
    }
  }
`;
export const getCitiesAreas = gql`
  query addressValidationRules($countryCode: CountryCode!,$governorate: String!,$city: String!) {
    addressValidationRules(countryCode: $countryCode,governorate: $governorate,city:$city) {
      cityArea{
      code
      nameAr
      nameEn
    }
    }
  }
`;

export const getWarehouseManagers = gql`
  query warehouseManagers($supplierId:String!){
  warehouseManagers(filter: { supplierId: $supplierId},first:100){
    edges{
      node{
      id
      firstName
      lastName
      phone
      }
    }
  }
}
`;
