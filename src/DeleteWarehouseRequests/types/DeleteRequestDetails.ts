/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NewProductInput} from "./../../types/globalTypes";
import { UpdateNewProduct_NewProductUpdate } from "@saleor/newProductRequest/types/UpdateSupplier";

// ====================================================
// GraphQL query operation: WarehouseMangerDetails
// ====================================================



export interface SupplierDetails_user {
  __typename: "User";
  id:string
  status:string
  createdAt:string
  updatedAt:string
  warehouse:{
    name:string
    companyName:string
    address:{
      streetAddress1:string
      country:
        {
          country:string
        }
      governorate:string
      city:string
      cityArea:string
    }
  }
  supplier :{
  firstName:string
  lastName:string
  phone:string
}
}

export interface DeleteRequestDetails {
  requestDeleteWarehouse: SupplierDetails_user | null;
}

export interface RequestDetailsVariables {
  id: string;
}
export interface UpdateRequest {
  changeStatusDeleteWarehouse: UpdateNewProduct_NewProductUpdate | null;
}

export interface UpdateRequestVariables {
  input: NewProductInput;
}
