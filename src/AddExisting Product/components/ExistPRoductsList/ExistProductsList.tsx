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

import { ListExistingProducts_ExistingProducts_edges_node } from "../../types/ListExistProducts";

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
 export enum ExistingProductsListUrlSortField {
  name = "name",
  status = "status",
  Creation_Date = " Creation_Date",
  SupplierName="Supplier_Name",
}
export interface ExistProductsListPageProps
  extends ListProps,
    ListActions,
    SortPage<ExistingProductsListUrlSortField> {
  ExistProducts: ListExistingProducts_ExistingProducts_edges_node[];
}

const numberOfColumns = 6;

const ExistProductsList: React.FC<ExistProductsListPageProps> = props => {
  const {
    settings,
    disabled,
    ExistProducts,
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
        items={ExistProducts}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === ExistingProductsListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(ExistingProductsListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage=" Product Name" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === ExistingProductsListUrlSortField.SupplierName
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(ExistingProductsListUrlSortField.SupplierName)}
          className={classes.colSupName}
        >
          <FormattedMessage defaultMessage="sku" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === ExistingProductsListUrlSortField.status
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(ExistingProductsListUrlSortField.status)}
          className={classes.colStatus}
        >
          <FormattedMessage defaultMessage="Statue" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === ExistingProductsListUrlSortField.status
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(ExistingProductsListUrlSortField.status)}
          className={classes.colType}
        >
          <FormattedMessage defaultMessage="type" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === ExistingProductsListUrlSortField.Creation_Date
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(ExistingProductsListUrlSortField.Creation_Date)}
          className={classes.colDate}
        >
          <FormattedMessage defaultMessage="Creation Date" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === ExistingProductsListUrlSortField.SupplierName
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(ExistingProductsListUrlSortField.SupplierName)}
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
          ExistProducts,
          ExistProduct => {
            const isSelected = ExistProduct ? isChecked(ExistProduct.id) : false;

            return (
              <TableRow
                className={!!ExistProduct ? classes.tableRow : undefined}
                hover={!!ExistProduct}
                key={ExistProduct ? ExistProduct.id : "skeleton"}
                selected={isSelected}
                onClick={ExistProduct ? onRowClick(ExistProduct.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(ExistProduct.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => ExistProduct.product.name, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colSupName}>
                  {maybe<React.ReactNode>(() => ExistProduct.product.sku, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colstatus}>
                  {maybe<React.ReactNode>(() => ExistProduct.status, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colType}>
                  {maybe<React.ReactNode>(() => ExistProduct.type, <Skeleton />)}
                </TableCell>
                <TableCell >
                  {maybe<React.ReactNode>(() => ExistProduct.createdAt.slice(0,10), <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colName}>
                  {maybe<React.ReactNode>(() => ExistProduct.supplier.firstName+" "+ExistProduct.supplier.lastName, <Skeleton />)}
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
ExistProductsList.displayName = "ExistProductsList";
export default ExistProductsList;
