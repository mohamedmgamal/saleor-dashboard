export interface AddressTypeInput {
  supplier: string;
  city: string;
  cityArea?: string;
  companyName?: string;
  country: string;
  governorate?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  streetAddress1: string;
  streetAddress2?: string;
}
export interface AddressType {
  id: string;
  city: string;
  cityArea?: string;
  companyName?: string;
  country: {
    code: string;
    country: string;
  };
  governorate?: string;
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress1: string;
  streetAddress2?: string;
}
