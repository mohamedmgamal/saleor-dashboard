import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import {maybe, renderCollection } from "@saleor/misc";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges_node } from "../../types/RequesstDeleteWarehouse";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colStatus: {},
      colType: {},
      colName: {},
      colDate: {
        width: 200
      }
    },
    colStatus: {},
    colName: {
      paddingLeft: 0
    },
    colDate: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "SupplierList" }
);
 export enum DeleteWarehousesListUrlSortField {
  name = "name",
  status = "status",
  Creation_Date = " Creation_Date",
  SupplierName="Supplier_Name",
}
export interface DeleteWarehousesListPageProps
  extends ListProps,
    ListActions,
    SortPage<DeleteWarehousesListUrlSortField> {
  Requests: ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges_node[];
}

const numberOfColumns = 4;

const DeleteWarehousesList: React.FC<DeleteWarehousesListPageProps> = props => {
  const {
    settings,
    disabled,
    Requests,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    toolbar,
    toggle,
    toggleAll,
    selected,
    sort,
    isChecked
  } = props;
  const classes = useStyles(props);
  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={Requests}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === DeleteWarehousesListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(DeleteWarehousesListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage=" Warehouse Name" />
        </TableCellHeader>

        <TableCellHeader
          direction={
            sort.sort === DeleteWarehousesListUrlSortField.status
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(DeleteWarehousesListUrlSortField.status)}
          className={classes.colSupName}
        >
          <FormattedMessage defaultMessage="Status" />
        </TableCellHeader>

        <TableCellHeader
          direction={
            sort.sort === DeleteWarehousesListUrlSortField.Creation_Date
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(DeleteWarehousesListUrlSortField.Creation_Date)}
          className={classes.colStatus}
        >
          <FormattedMessage defaultMessage="Creation Date" />
        </TableCellHeader>

        <TableCellHeader
          direction={
            sort.sort === DeleteWarehousesListUrlSortField.SupplierName
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(DeleteWarehousesListUrlSortField.SupplierName)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="Supplier Name" />
        </TableCellHeader>

      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          Requests,
          Request => {
            const isSelected = Request ? isChecked(Request.id) : false;

            return (
              <TableRow
                className={!!Request ? classes.tableRow : undefined}
                hover={!!Request}
                key={Request ? Request.id : "skeleton"}
                selected={isSelected}
                onClick={Request ? onRowClick(Request.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(Request.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => Request.warehouse.name, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colSupName}>
                  {maybe<React.ReactNode>(() => Request.status, <Skeleton />)}
                </TableCell>
                <TableCell >
                  {maybe<React.ReactNode>(() => Request.createdAt.slice(0,10), <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => Request.supplier.firstName+" "+Request.supplier.lastName, <Skeleton />)}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No Requests found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
DeleteWarehousesList.displayName = "DeleteWarehousesList";
export default DeleteWarehousesList;
