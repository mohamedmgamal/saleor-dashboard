
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
import React from "react";
import {useIntl } from "react-intl";

import { ListNewWareHouses_NewWareHouses_edges_node } from "../../types/ListNewWarehouses";
import NewWareHousesList , {NewWareHousesListUrlSortField}from "../NewWareHousesList/NewWareHousesList";
import {
  createFilterStructure,
  SupplierFilterKeys,
  SupplierListFilterOpts
} from "./filters";

export interface NewProductsListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<SupplierFilterKeys, SupplierListFilterOpts>,
    SortPage<NewWareHousesListUrlSortField>,
    TabPageProps {
  Requests: ListNewWareHouses_NewWareHouses_edges_node[];
}

const NewProductsListPage: React.FC<NewProductsListPageProps> = ({
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
  ...NewProductsListPageProps
}) => {
  const intl = useIntl();

  const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.addWareHouse)}>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Requests",
            description: "tab name"
          })}
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Requests"
          })}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <NewWareHousesList {...NewProductsListPageProps} />
      </Card>
    </Container>
  );

};
NewProductsListPage.displayName = "NewProductsListPage";
export default NewProductsListPage;
