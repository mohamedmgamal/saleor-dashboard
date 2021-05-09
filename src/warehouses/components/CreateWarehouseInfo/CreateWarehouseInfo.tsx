import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import { WarehouseErrorFragment } from "@saleor/fragments/types/WarehouseErrorFragment";
import { FormChange } from "@saleor/hooks/useForm";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getWarehouseErrorMessage from "@saleor/utils/errors/warehouse";
import React from "react";
import { useIntl } from "react-intl";
import { useQuery } from "react-apollo";
import { getSuppliers } from "@saleor/wareHouseMangers/queries";
import { MenuItem } from "@material-ui/core";
import {Grid} from "@saleor/components/Grid";
import Select from "@material-ui/core/Select";
import { getWarehouseManagers } from "@saleor/warehouses/queries";
export interface WarehouseInfoProps {
  dataa: {
    name: string;
    supplier: any;
    warehouseManager:any;
  };
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  onChange: FormChange;
}

const CreateWarehouseInfo: React.FC<WarehouseInfoProps> = ({
  dataa,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "supplier","warehouseManager"], errors);
  const {data } = useQuery(getSuppliers);
  const {data:WarehouseManagers,refetch:fetchWarehouseManagers} = useQuery(getWarehouseManagers, {
    variables: {supplierId:dataa.supplier},
  });
  return (
    <Card dataa-test="generalInformationSection">
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          helperText={getWarehouseErrorMessage(formErrors.name, intl)}
          label={intl.formatMessage({
            defaultMessage: "Warehouse Name"
          })}
          name={"name" as keyof typeof dataa}
          value={dataa.name}
          onChange={onChange}
        />
        <FormSpacer />
        <Grid>
        <Select
          disabled={disabled}
          name="supplier"
          error={!!formErrors.supplier}
          value={dataa.supplier}
          onChange={((e)=>{
            // @ts-ignore
            onChange(e);
            fetchWarehouseManagers();
          })}
        ><MenuItem disabled selected>Suppliers</MenuItem>
          {
            data?.["suppliers"]?.["edges"] && data?.["suppliers"]?.["edges"].map((supplier)=>{
              return ( <MenuItem value={supplier?.node.id}>{supplier?.node.firstName+"  "+supplier?.node.lastName+" "
              +supplier?.node.phone}</MenuItem>)
            })
          }
        </Select>
        <Select
          disabled={disabled}
          name="warehouseManager"
          error={!!formErrors.warehouseManager}
          value={dataa.warehouseManager}
          // @ts-ignore
          onChange={onChange}
        ><MenuItem disabled selected>Warehouse Manager</MenuItem>
          {
            WarehouseManagers?.["warehouseManagers"]?.["edges"] && WarehouseManagers?.["warehouseManagers"]?.["edges"].map((warehouseManager)=>{
              return ( <MenuItem value={warehouseManager?.node.id}>{warehouseManager?.node.firstName+"  "+warehouseManager?.node.lastName+" "
              +warehouseManager?.node.phone}</MenuItem>)
            })
          }
        </Select></Grid>
      </CardContent>
    </Card>
  );
};

CreateWarehouseInfo.displayName = "CreateWarehouseInfo";
export default CreateWarehouseInfo;
