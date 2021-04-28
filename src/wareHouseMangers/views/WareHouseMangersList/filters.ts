import { IFilterElement } from "@saleor/components/Filter";
import { maybe } from "@saleor/misc";
import { SupplierFilterInput } from "@saleor/types/globalTypes";
import { wareHouseMangersFilterKeys, WareHouseMangersListFilterOpts } from "@saleor/wareHouseMangers/components/WareHouseMangersListPage";

import {
  createFilterTabUtils,
  createFilterUtils,
  getMinMaxQueryParam
} from "../../../utils/filters";
import { wareHouseMangerListUrlFilters, wareHouseMangerListUrlFiltersEnum, wareHouseMangerListUrlQueryParams } from "../../urls";

export const Supplier_FILTERS_KEY = "SupplierFilters";

export function getFilterOpts(
  params: wareHouseMangerListUrlFilters
): WareHouseMangersListFilterOpts {
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
  };
}

export function getFilterVariables(
  params: wareHouseMangerListUrlFilters
): SupplierFilterInput {
  return {
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<wareHouseMangersFilterKeys>
): wareHouseMangerListUrlFilters {
  const { name } = filter;

  switch (name) {
    case wareHouseMangersFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        wareHouseMangerListUrlFiltersEnum.joinedFrom,
        wareHouseMangerListUrlFiltersEnum.joinedTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<wareHouseMangerListUrlFilters>(Supplier_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  wareHouseMangerListUrlQueryParams,
  wareHouseMangerListUrlFilters
>(wareHouseMangerListUrlFiltersEnum);
