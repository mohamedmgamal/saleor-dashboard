import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@saleor/components/ActionDialog";
import DeleteFilterTabDialog from "@saleor/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@saleor/components/SaveFilterTabDialog";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import useShop from "@saleor/hooks/useShop";
import { commonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@saleor/utils/handlers/filterHandlers";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import NewProductsListPage from "../../components/NewProductListPage";
import { TypedBulkRemoveSuppliers } from "../../mutations";
import { useNewNewWarehousesListQuery } from "../../queries";
import { BulkRemoveSupplier } from "../../types/BulkRemoveSupplier";
 import {
  newWareHouseAddUrl,
  newWareHouseListUrl,
  NewWareHouseListUrlDialog,
  NewWareHouseListUrlQueryParams,
  newWareHouseUrl, NewWareHouseUrlQueryParams
 } from "../../urls";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "./filters";
import { getSortQueryVariables } from "./sort";

interface NewProductListProps {
  params: NewWareHouseListUrlQueryParams;
}

export const NewWarehouseList: React.FC<NewProductListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );

  const { updateListSettings, settings } = useListSettings(
    // todo: using Supplier list prop cause new ones gets errors
    ListViews.Supplier_LIST
  );
  const intl = useIntl();
  const shop = useShop();
  // TODO: error was here
  const  paginationState   = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data, loading, refetch } = useNewNewWarehousesListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const tabs = getFilterTabs();
  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params as NewWareHouseUrlQueryParams)
      ? tabs.length + 1
      : 0
      : parseInt(params.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: newWareHouseListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    NewWareHouseListUrlDialog,
    NewWareHouseListUrlQueryParams
    >(navigate, newWareHouseListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      newWareHouseListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(newWareHouseListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params as NewWareHouseUrlQueryParams));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.requestsAddWarehouse.pageInfo),
    paginationState,
    params
  );

  const handleBulkSupplierDelete = (data: BulkRemoveSupplier) => {
    if (data.SupplierBulkDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
      refetch();
      closeModal();
    }
  };

  const handleSort = createSortHandler(navigate, newWareHouseListUrl, params);
  const currencySymbol = maybe(() => shop.defaultCurrency, "USD");
  // @ts-ignore
  return(<TypedBulkRemoveSuppliers onCompleted={handleBulkSupplierDelete}>
       {(BulkRemoveSupplier, bulkRemoveSuppliersOpts) => (
         <>
           <NewProductsListPage
             currencySymbol={currencySymbol}
             currentTab={currentTab}
             filterOpts={getFilterOpts(params)}
             initialSearch={params.query || ""}
             onSearchChange={handleSearchChange}
             onFilterChange={changeFilters}
             onAll={resetFilters}
             onTabChange={handleTabChange}
             onTabDelete={() => openModal("delete-search")}
             onTabSave={() => openModal("save-search")}
             tabs={tabs.map(tab => tab.name)}
             Requests={maybe(() => data.requestsAddWarehouse.edges.map(edge => edge.node))}
             settings={settings}
             disabled={loading}
             pageInfo={pageInfo}
             onAdd={() => navigate(newWareHouseAddUrl)}
             onNextPage={loadNextPage}
             onPreviousPage={loadPreviousPage}
             onUpdateListSettings={updateListSettings}
             onRowClick={id => () => navigate(newWareHouseUrl(id))}
             onSort={handleSort}
             toolbar={
               <IconButton
                 color="primary"
                 onClick={() =>
                   openModal("remove", {
                     ids: listElements
                   })
                 }
               >
                 <DeleteIcon />
               </IconButton>
             }
             isChecked={isSelected}
             selected={listElements.length}
             sort={getSortParams(params)}
             toggle={toggle}
             toggleAll={toggleAll}
           />
           <ActionDialog
             open={
               params.action === "remove" && maybe(() => params.ids.length > 0)
             }
             onClose={closeModal}
             confirmButtonState={bulkRemoveSuppliersOpts.status}
             onConfirm={() =>
               BulkRemoveSupplier({
                 variables: {
                   // @ts-ignore
                   ids: params.ids
                 }
               })
             }
             variant="delete"
             title={intl.formatMessage({
               defaultMessage: "Delete Suppliers",
               description: "dialog header"
             })}
           >
             <DialogContentText>
               <FormattedMessage
                 defaultMessage="{counter,plural,one{Are you sure you want to delete this Supplier?} other{Are you sure you want to delete {displayQuantity} Suppliers?}}"
                 values={{
                   counter: maybe(() => params.ids.length),
                   displayQuantity: (
                     <strong>{maybe(() => params.ids.length)}</strong>
                   )
                 }}
               />
             </DialogContentText>
           </ActionDialog>
           <SaveFilterTabDialog
             open={params.action === "save-search"}
             confirmButtonState="default"
             onClose={closeModal}
             onSubmit={handleTabSave}
           />
           <DeleteFilterTabDialog
             open={params.action === "delete-search"}
             confirmButtonState="default"
             onClose={closeModal}
             onSubmit={handleTabDelete}
             tabName={maybe(() => tabs[currentTab - 1].name, "...")}
           />
         </>
       )}
     </TypedBulkRemoveSuppliers>
   );
};
export default NewWarehouseList;
