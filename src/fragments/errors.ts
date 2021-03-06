import gql from "graphql-tag";

export const productErrorFragment = gql`
  fragment ProductErrorFragment on ProductError {
    code
    field
  }
`;

export const productErrorWithAttributesFragment = gql`
  ${productErrorFragment}
  fragment ProductErrorWithAttributesFragment on ProductError {
    ...ProductErrorFragment
    attributes
  }
`;

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
    message
  }
`;
export const supplierErrorFragment = gql`
  fragment supplierError on SupplierError {
    code
    field
    message
  }
`;

export const discountErrorFragment = gql`
  fragment DiscountErrorFragment on DiscountError {
    code
    field
  }
`;

export const menuErrorFragment = gql`
  fragment MenuErrorFragment on MenuError {
    code
    field
  }
`;

export const orderErrorFragment = gql`
  fragment OrderErrorFragment on OrderError {
    code
    field
  }
`;

export const pageErrorFragment = gql`
  fragment PageErrorFragment on PageError {
    code
    field
  }
`;

export const permissionGroupErrorFragment = gql`
  fragment PermissionGroupErrorFragment on PermissionGroupError {
    code
    field
  }
`;

export const bulkProductErrorFragment = gql`
  fragment BulkProductErrorFragment on BulkProductError {
    field
    code
    index
  }
`;
export const bulkStockErrorFragment = gql`
  fragment BulkStockErrorFragment on BulkStockError {
    code
    field
    index
  }
`;
export const stockErrorFragment = gql`
  fragment StockErrorFragment on StockError {
    code
    field
  }
`;

export const shippingErrorFragment = gql`
  fragment ShippingErrorFragment on ShippingError {
    code
    field
  }
`;

export const shopErrorFragment = gql`
  fragment ShopErrorFragment on ShopError {
    code
    field
  }
`;

export const staffErrorFragment = gql`
  fragment StaffErrorFragment on StaffError {
    code
    field
  }
`;

export const warehouseErrorFragment = gql`
  fragment WarehouseErrorFragment on WarehouseError {
    code
    field
  }
`;

export const webhookErrorFragment = gql`
  fragment WebhookErrorFragment on WebhookError {
    code
    field
  }
`;

export const invoiceErrorFragment = gql`
  fragment InvoiceErrorFragment on InvoiceError {
    code
    field
  }
`;

export const appErrorFragment = gql`
  fragment AppErrorFragment on AppError {
    field
    message
    code
    permissions
  }
`;

export const exportErrorFragment = gql`
  fragment ExportErrorFragment on ExportError {
    code
    field
  }
`;

export const pluginErrorFragment = gql`
  fragment PluginErrorFragment on PluginError {
    code
    field
  }
`;

export const metadataErrorFragment = gql`
  fragment MetadataErrorFragment on MetadataError {
    code
    field
  }
`;
