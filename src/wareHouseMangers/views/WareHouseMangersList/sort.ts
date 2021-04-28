import { UserSortField } from "@saleor/types/globalTypes";
import { createGetSortQueryVariables } from "@saleor/utils/sort";
import { WarehouseListUrlSortField } from "@saleor/warehouses/urls";

export function getSortQueryField(
  sort: WarehouseListUrlSortField
): UserSortField {
  switch (sort) {
    case WarehouseListUrlSortField.name:
      return UserSortField.LAST_NAME;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
