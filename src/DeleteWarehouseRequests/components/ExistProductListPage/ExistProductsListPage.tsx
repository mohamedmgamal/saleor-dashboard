
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

import { ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges_node } from "../../types/RequesstDeleteWarehouse";
import DeleteWarehousesList , {DeleteWarehousesListUrlSortField}from "../ExistPRoductsList/DeleteWarehousesList";
import {
  createFilterStructure,
  SupplierFilterKeys,
  SupplierListFilterOpts
} from "./filters";

export interface ExistProductsListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<SupplierFilterKeys, SupplierListFilterOpts>,
    SortPage<DeleteWarehousesListUrlSortField>,
    TabPageProps {
  Requests: ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges_node[];
}

const ExistProductsListPage: React.FC<ExistProductsListPageProps> = ({
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
  ...ExistProductsListPageProps
}) => {
  const intl = useIntl();

  const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.addExisting)}>
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
        <DeleteWarehousesList {...ExistProductsListPageProps} />
      </Card>
    </Container>
  );

};
ExistProductsListPage.displayName = "ExistProductsListPage";
export default ExistProductsListPage;
