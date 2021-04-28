/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.
// ====================================================
// GraphQL query operation: WarehouseMangerDetails
// ====================================================


export interface requestNewProductDetails_user {
  __typename: "User";
  id:string
  status:string
  name:string
  createdAt:any
  updatedAt:any
  sku:string
  priceAmount:string
  image:string
  supplier:
        {
          firstName
         lastName
          phone
        }
}

export interface NewProductDetails {
  requestNewProduct: requestNewProductDetails_user | null;
}

export interface requestNewProductDetailsVariables {
  id: string;
}
