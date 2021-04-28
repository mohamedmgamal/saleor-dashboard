import { IFilterElement } from "@saleor/components/Filter";
import { maybe } from "@saleor/misc";
import { SupplierFilterKeys, SupplierListFilterOpts } from "@saleor/suppliers/components/SupplierListPage";
import { SupplierFilterInput } from "@saleor/types/globalTypes";

import {
  createFilterTabUtils,
  createFilterUtils,
  getMinMaxQueryParam
} from "../../../utils/filters";
import { NewProductListUrlFilters, NewProductListUrlFiltersEnum, NewProductListUrlQueryParams } from "../../urls";

export const NewProducts_FILTERS_KEY = "NewProductsFilters";

export function getFilterOpts(
  params: NewProductListUrlFilters
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
  params: NewProductListUrlFilters
): SupplierFilterInput {
  return {
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<SupplierFilterKeys>
): NewProductListUrlFilters {
  const { name } = filter;

  switch (name) {
    case SupplierFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        NewProductListUrlFiltersEnum.joinedFrom,
        NewProductListUrlFiltersEnum.joinedTo
      );

    case SupplierFilterKeys.moneySpent:
      return getMinMaxQueryParam(
        filter,
        NewProductListUrlFiltersEnum.moneySpentFrom,
        NewProductListUrlFiltersEnum.moneySpentTo
      );

    case SupplierFilterKeys.numberOfOrders:
      return getMinMaxQueryParam(
        filter,
        NewProductListUrlFiltersEnum.numberOfOrdersFrom,
        NewProductListUrlFiltersEnum.numberOfOrdersTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<NewProductListUrlFilters>(NewProducts_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  NewProductListUrlQueryParams,
  NewProductListUrlFilters
>(NewProductListUrlFiltersEnum);
