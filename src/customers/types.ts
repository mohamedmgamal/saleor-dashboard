export interface AddressTypeInput {
  city: string;
  cityArea?: string;
  country: any;
  governorate: string;
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
