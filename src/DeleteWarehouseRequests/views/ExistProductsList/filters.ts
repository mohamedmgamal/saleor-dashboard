import { IFilterElement } from "@saleor/components/Filter";
import { maybe } from "@saleor/misc";
import { SupplierFilterKeys, SupplierListFilterOpts } from "@saleor/suppliers/components/SupplierListPage";
import { SupplierFilterInput } from "@saleor/types/globalTypes";

import {
  createFilterTabUtils,
  createFilterUtils,
  getMinMaxQueryParam
} from "../../../utils/filters";
import { DeleteWarehouseListUrlFilters, DeleteWarehouseListUrlFiltersEnum, DeleteWarehouseListUrlQueryParams } from "../../urls";

export const NewProducts_FILTERS_KEY = "NewProductsFilters";

export function getFilterOpts(
  params: DeleteWarehouseListUrlFilters
): SupplierListFilterOpts {
  return {
    joined: {
      active: maybe(
        () =>
          [params.joinedFrom, params.joinedTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.joinedTo, ""),
        min: maybe(() => params.joinedFrom, "")
      }
    },
    moneySpent: {
      active: maybe(
        () =>
          [params.moneySpentFrom, params.moneySpentTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.moneySpentTo, ""),
        min: maybe(() => params.moneySpentFrom, "")
      }
    },
    numberOfOrders: {
      active: maybe(
        () =>
          [params.numberOfOrdersFrom, params.numberOfOrdersTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.numberOfOrdersTo, ""),
        min: maybe(() => params.numberOfOrdersFrom, "")
      }
    }
  };
}

export function getFilterVariables(
  params: DeleteWarehouseListUrlFilters
): SupplierFilterInput {
  return {
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<SupplierFilterKeys>
): DeleteWarehouseListUrlFilters {
  const { name } = filter;

  switch (name) {
    case SupplierFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        DeleteWarehouseListUrlFiltersEnum.joinedFrom,
        DeleteWarehouseListUrlFiltersEnum.joinedTo
      );

    case SupplierFilterKeys.moneySpent:
      return getMinMaxQueryParam(
        filter,
        DeleteWarehouseListUrlFiltersEnum.moneySpentFrom,
        DeleteWarehouseListUrlFiltersEnum.moneySpentTo
      );

    case SupplierFilterKeys.numberOfOrders:
      return getMinMaxQueryParam(
        filter,
        DeleteWarehouseListUrlFiltersEnum.numberOfOrdersFrom,
        DeleteWarehouseListUrlFiltersEnum.numberOfOrdersTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<DeleteWarehouseListUrlFilters>(NewProducts_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  DeleteWarehouseListUrlQueryParams,
  DeleteWarehouseListUrlFilters
>(DeleteWarehouseListUrlFiltersEnum);
