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

import WareHouseMangersListPage from "../../components/WareHouseMangersListPage";
import { TypedBulkRemoveSuppliers } from "../../mutations";
import { useWareHouseMangersListQuery } from "../../queries";
import { BulkRemoveWarehouseManger } from "../../types/BulkRemoveWarehouseManger";
import {
  wareHouseMangerAddUrl,
  wareHouseMangerListUrl,
  wareHouseMangerListUrlDialog,
  wareHouseMangerListUrlQueryParams,
  wareHouseMangerUrl
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

interface WareHouseMangerListProps {
  params: wareHouseMangerListUrlQueryParams;
}

export const WareHouseMangersList: React.FC<WareHouseMangerListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const { updateListSettings, settings } = useListSettings(ListViews.Supplier_LIST
  );
  const intl = useIntl();
  const shop = useShop();
  // TODO: need to be added to src/config
  const  paginationState   = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data, loading, refetch } = useWareHouseMangersListQuery({
    displayLoader: true,
    variables: queryVariables
  });
  const tabs = getFilterTabs();
  const currentTab =
    params.activeTab === undefined
      // todo: need to be changed to params
      ? areFiltersApplied(params)
      ? tabs.length + 1
      : 0
      : parseInt(params.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: wareHouseMangerListUrl,
    getFilterQueryParam,
    navigate,
    params
  });
 //  data.warehouseManager.edges.map(edge => console.log(edge.node))
  const [openModal, closeModal] = createDialogActionHandlers<
    wareHouseMangerListUrlDialog,
    wareHouseMangerListUrlQueryParams
    >(navigate, wareHouseMangerListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      wareHouseMangerListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(wareHouseMangerListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.warehouseManagers.pageInfo),
    paginationState,
    params
  );

  const handleBulkSupplierDelete = (data: BulkRemoveWarehouseManger) => {
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
  const handleSort = createSortHandler(navigate, wareHouseMangerListUrl, params);
  const currencySymbol = maybe(() => shop.defaultCurrency, "USD");
  return(<TypedBulkRemoveSuppliers onCompleted={handleBulkSupplierDelete}>
       {(BulkRemoveSupplier, bulkRemoveSuppliersOpts) => (
         <>
           <WareHouseMangersListPage
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
             wareHouseMangers={maybe(() => data.warehouseManagers.edges.map(edge => edge.node))}
             settings={settings}
             disabled={loading}
             pageInfo={pageInfo}
             onAdd={() => navigate(wareHouseMangerAddUrl)}
             onNextPage={loadNextPage}
             onPreviousPage={loadPreviousPage}
             onUpdateListSettings={updateListSettings}
             onRowClick={id => () => navigate(wareHouseMangerUrl(id))}
             // todo:handle this error
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
             // todo:handle this error
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
export default WareHouseMangersList;
