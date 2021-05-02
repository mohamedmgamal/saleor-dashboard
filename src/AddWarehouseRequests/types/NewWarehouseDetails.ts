/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.
// ====================================================
// GraphQL query operation: WarehouseMangerDetails
// ====================================================


export interface requestNewProductDetails_user {
  __typename: "User";
  id:string
  status: string
  createdAt: string
  updatedAt: string
  address: {
    country:
      {
        country: string
      }
    governorate: string
    city: string
    cityArea: string
    streetAddress1: string
  }
  name: string
  supplier: supplier
}
interface supplier{
  firstName:string;
  lastName:string;
  phone:string
}
export interface NewWarehouseDetails {
  requestAddWarehouse: requestNewProductDetails_user | null;
}

export interface requestNewWarehouseDetailsVariables {
  id: string;
}
