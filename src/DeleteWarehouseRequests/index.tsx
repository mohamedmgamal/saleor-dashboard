import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {DeleteWarehousesListUrlSortField}from "./components/ExistPRoductsList/DeleteWarehousesList";
import {
  deleteWarehouseListPath,
  DeleteWarehouseListUrlQueryParams,
  deleteWarehousePath,
  DeleteWarehouseUrlQueryParams
} from "./urls";
import DeleteWarehouseListViewComponent from "./views/ExistProductsList";
import RequestDetailsView from "./views/DeleteWarehouseRequestDetails";

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
    <RequestDetailsView
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
        <Route path={deleteWarehousePath(":id")} component={SupplierDetailsView} />
      </Switch>
    </>
  );
};
