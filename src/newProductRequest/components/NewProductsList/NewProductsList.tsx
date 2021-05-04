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

import { ListNewProducts_NewProducts_edges_node } from "../../types/ListNewProducts";

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
 export enum NewProductsListUrlSortField {
  name = "name",
  status = "status",
  Creation_Date = " Creation_Date",
  SupplierName="Supplier_Name",
}
export interface NewProductsListProps
  extends ListProps,
    ListActions,
    SortPage<NewProductsListUrlSortField> {
  NewProducts: ListNewProducts_NewProducts_edges_node[];
}

const numberOfColumns = 5;

const NewProductsList: React.FC<NewProductsListProps> = props => {
  const {
    settings,
    disabled,
    NewProducts,
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
        items={NewProducts}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === NewProductsListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(NewProductsListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="Name" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === NewProductsListUrlSortField.SupplierName
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(NewProductsListUrlSortField.SupplierName)}
          className={classes.colSupName}
        >
          <FormattedMessage defaultMessage="sku" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === NewProductsListUrlSortField.status
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(NewProductsListUrlSortField.status)}
          className={classes.colStatus}
        >
          <FormattedMessage defaultMessage="Statue" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === NewProductsListUrlSortField.Creation_Date
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(NewProductsListUrlSortField.Creation_Date)}
          className={classes.colDate}
        >
          <FormattedMessage defaultMessage="Creation Date" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === NewProductsListUrlSortField.SupplierName
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(NewProductsListUrlSortField.SupplierName)}
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
          NewProducts,
          NewProduct => {
            const isSelected = NewProduct ? isChecked(NewProduct.id) : false;

            return (
              <TableRow
                className={!!NewProduct ? classes.tableRow : undefined}
                hover={!!NewProduct}
                key={NewProduct ? NewProduct.id : "skeleton"}
                selected={isSelected}
                onClick={NewProduct ? onRowClick(NewProduct.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(NewProduct.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => NewProduct.name, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colSupName}>
                  {maybe<React.ReactNode>(() => NewProduct.sku, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colstatus}>
                  {maybe<React.ReactNode>(() => NewProduct.status, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colDate}>
                  {maybe<React.ReactNode>(() => NewProduct.createdAt.slice(0,10), <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => NewProduct.supplier.firstName+" "+NewProduct.supplier.lastName, <Skeleton />)}
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
NewProductsList.displayName = "NewProductsList";
export default NewProductsList;
