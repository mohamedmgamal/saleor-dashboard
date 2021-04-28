import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@saleor/types";
import { wareHouseMangerListUrlSortField } from "@saleor/wareHouseMangers/urls";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ListwareHouseMangers_wareHouseMangers_edges_node } from "../../types/ListWareHouseMangers";
import WareHouseMangersList from "../WareHouseMangersList/WareHouseMangersList";
import {
  createFilterStructure,
  wareHouseMangersFilterKeys,
  WareHouseMangersListFilterOpts
} from "./filters";

export interface WarehouseMangersListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<wareHouseMangersFilterKeys, WareHouseMangersListFilterOpts>,
    SortPage<wareHouseMangerListUrlSortField>,
    TabPageProps {
  wareHouseMangers: ListwareHouseMangers_wareHouseMangers_edges_node[];
}
const SupplierListPage: React.FC<WarehouseMangersListPageProps> = ({
                                                             currencySymbol,
                                                             currentTab,
                                                             filterOpts,
                                                             initialSearch,
                                                             onAdd,
                                                             onAll,
                                                             onFilterChange,
                                                             onSearchChange,
                                                             onTabChange,
                                                             onTabDelete,
                                                             onTabSave,
                                                             tabs,
                                                             ...WarehouseMangersListProps
                                                           }) => {
  const intl = useIntl();
  const structure = createFilterStructure(intl, filterOpts);
  // console.log(WarehouseMangersListProps)
  // @ts-ignore
  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.WarehouseManagers)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create Warehouse Managers"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Warehouse Managers",
            description: "tab name"
          })}
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Warehouse Managers"
          })}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <WareHouseMangersList {...WarehouseMangersListProps} />
      </Card>
    </Container>
  );
};
SupplierListPage.displayName = "SupplierListPage";
export default SupplierListPage;
