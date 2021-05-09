import gql from "graphql-tag";

import { fragmentAddress } from "./address";
export const wareHouseFragment = gql`
  fragment wareHouseFragment on Warehouse {
    companyName
      name
  }
`;
export const wareHouseMangersFragment = gql`
  ${wareHouseFragment}
  fragment wareHouseMangersFragment on WarehouseManager {
      id
      firstName
      lastName
      phone
      isActive
      dateJoined
      email
      supplier{
      firstName
      lastName
      }
      warehouses(first:20) {
          edges {
            node {
             ...wareHouseFragment
            }
          }
        }
  }
`;

export const wareHouseMangersDetailsFragment = gql`
  fragment WareHouseMangerDetailsFragment on WareHouseManger {
    id
    supplier{
      firstName
      lastName
    }
    dateJoined
    note
    isActive
    phone
    firstName
    lastName
    supplier
  }
`;

export const customerAddressesFragment = gql`
  ${fragmentAddress}
  fragment CustomerAddressesFragment on User {
    ...CustomerFragment
    addresses {
      ...AddressFragment
    }
    defaultBillingAddress {
      id
    }
    defaultShippingAddress {
      id
    }
  }
`;
