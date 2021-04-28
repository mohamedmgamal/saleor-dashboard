import { IFilterElement } from "@saleor/components/Filter";
import { maybe } from "@saleor/misc";
import { SupplierFilterKeys, SupplierListFilterOpts } from "@saleor/suppliers/components/SupplierListPage";
import { SupplierFilterInput } from "@saleor/types/globalTypes";

import {
  createFilterTabUtils,
  createFilterUtils,
  getMinMaxQueryParam
} from "../../../utils/filters";
import { ExistingProductListUrlFilters, ExistingProductListUrlFiltersEnum, ExistingProductListUrlQueryParams } from "../../urls";

export const NewProducts_FILTERS_KEY = "NewProductsFilters";

export function getFilterOpts(
  params: ExistingProductListUrlFilters
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
  params: ExistingProductListUrlFilters
): SupplierFilterInput {
  return {
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<SupplierFilterKeys>
): ExistingProductListUrlFilters {
  const { name } = filter;

  switch (name) {
    case SupplierFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        ExistingProductListUrlFiltersEnum.joinedFrom,
        ExistingProductListUrlFiltersEnum.joinedTo
      );

    case SupplierFilterKeys.moneySpent:
      return getMinMaxQueryParam(
        filter,
        ExistingProductListUrlFiltersEnum.moneySpentFrom,
        ExistingProductListUrlFiltersEnum.moneySpentTo
      );

    case SupplierFilterKeys.numberOfOrders:
      return getMinMaxQueryParam(
        filter,
        ExistingProductListUrlFiltersEnum.numberOfOrdersFrom,
        ExistingProductListUrlFiltersEnum.numberOfOrdersTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<ExistingProductListUrlFilters>(NewProducts_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  ExistingProductListUrlQueryParams,
  ExistingProductListUrlFilters
>(ExistingProductListUrlFiltersEnum);
