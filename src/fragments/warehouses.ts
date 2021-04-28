import gql from "graphql-tag";


export const warehouseFragment = gql`
  fragment WarehouseFragment on Warehouse {
    id
    name
  }
`;
export const warehouseWithShippingFragment = gql`
  ${warehouseFragment}
  fragment WarehouseWithShippingFragment on Warehouse {
    ...WarehouseFragment
    shippingZones(first: 100) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const warehouseDetailsFragment = gql`
fragment WarehouseManagerDetailsFragment on Supplier {
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
    supplierId
}
`;
