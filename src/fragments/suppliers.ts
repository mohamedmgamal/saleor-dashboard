import gql from "graphql-tag";

import { fragmentAddress } from "./address";

export const supplierFragment = gql`
  fragment supplierFragment on Supplier {
    id
    email
    firstName
    lastName
    phone
  }
`;

export const supplierDetailsFragment = gql`
  fragment SupplierDetailsFragment on Supplier {
    id
    email 
    firstName
    lastName
    phone
    isActive
    dateJoined
  }
`;

export const customerAddressesFragment = gql`
  ${supplierFragment}
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
