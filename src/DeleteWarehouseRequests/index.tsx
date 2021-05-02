import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {DeleteWarehousesListUrlSortField}from "./components/ExistPRoductsList/DeleteWarehousesList";
import {
  deleteWarehouseAddressesPath,
  DeleteWarehouseAddressesUrlQueryParams,
  deleteWarehouseListPath,
  DeleteWarehouseListUrlQueryParams,
  deleteWarehousePath,
  DeleteWarehouseUrlQueryParams
} from "./urls";
import DeleteWarehouseListViewComponent from "./views/ExistProductsList";
import SupplierAddressesViewComponent from "./views/SupplierAddresses";
import SupplierDetailsViewComponent from "./views/RequestDetails";

export const DeleteWarehouseListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: DeleteWarehouseListUrlQueryParams = asSortParams(
    qs,
    DeleteWarehousesListUrlSortField
  );
  return <DeleteWarehouseListViewComponent params={params} />;
};

interface SupplierDetailsRouteParams {
  id: string;
}
const SupplierDetailsView: React.FC<RouteComponentProps<
  SupplierDetailsRouteParams
  >> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: DeleteWarehouseUrlQueryParams = qs;

  return (
    <SupplierDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

interface SupplierAddressesRouteParams {
  id: string;
}
const SupplierAddressesView: React.FC<RouteComponentProps<
  SupplierAddressesRouteParams
  >> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: DeleteWarehouseAddressesUrlQueryParams = qs;

  return (
    <SupplierAddressesViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const DeleteWarehouseSection: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.deleteWareHouse)} />
      <Switch>
        <Route exact path={deleteWarehouseListPath} component={DeleteWarehouseListView} />
        <Route
          path={deleteWarehouseAddressesPath(":id")}
          component={SupplierAddressesView}
        />
        <Route path={deleteWarehousePath(":id")} component={SupplierDetailsView} />
      </Switch>
    </>
  );
};
