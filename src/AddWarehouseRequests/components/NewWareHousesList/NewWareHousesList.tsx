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
// import { SupplierListUrlSortField } from "@saleor/Suppliers/urls";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ListNewWareHouses_NewWareHouses_edges_node } from "../../types/ListNewWarehouses";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colStatus: {},
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
 export enum NewWareHousesListUrlSortField {
  name = "name",
  status = "status",
  Creation_Date = " Creation_Date",
  SupplierName="Supplier_Name",
}
export interface NewProductsListProps
  extends ListProps,
    ListActions,
    SortPage<NewWareHousesListUrlSortField> {
  Requests: ListNewWareHouses_NewWareHouses_edges_node[];
}

const numberOfColumns = 4;

const NewWareHousesList: React.FC<NewProductsListProps> = props => {
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
            sort.sort === NewWareHousesListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(NewWareHousesListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="Name" />
        </TableCellHeader>

        <TableCellHeader
          direction={
            sort.sort === NewWareHousesListUrlSortField.status
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(NewWareHousesListUrlSortField.status)}
          className={classes.colSupName}
        >
          <FormattedMessage defaultMessage="status" />
        </TableCellHeader>

        <TableCellHeader
          direction={
            sort.sort === NewWareHousesListUrlSortField.Creation_Date
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(NewWareHousesListUrlSortField.Creation_Date)}
          className={classes.colStatus}
        >
          <FormattedMessage defaultMessage="Creation Date" />
        </TableCellHeader>

        <TableCellHeader
          direction={
            sort.sort === NewWareHousesListUrlSortField.SupplierName
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(NewWareHousesListUrlSortField.SupplierName)}
          className={classes.colSupName}
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
          request => {
            const isSelected = request ? isChecked(request.id) : false;

            return (
              <TableRow
                className={!!request ? classes.tableRow : undefined}
                hover={!!request}
                key={request ? request.id : "skeleton"}
                selected={isSelected}
                onClick={request ? onRowClick(request.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(request.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => request.name, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colstatus}>
                  {maybe<React.ReactNode>(() => request.status, <Skeleton />)}
                </TableCell>
                <TableCell>
                  {maybe<React.ReactNode>(() => request.createdAt.slice(0,10), <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => request.supplier.firstName+" "+request.supplier.lastName, <Skeleton />)}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No Suppliers found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
NewWareHousesList.displayName = "NewWareHousesList";
export default NewWareHousesList;
