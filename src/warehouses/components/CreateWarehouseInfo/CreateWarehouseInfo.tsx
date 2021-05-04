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
import Select from "@material-ui/core/Select";
export interface WarehouseInfoProps {
  dataa: {
    name: string;
    supplier: any;
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

  const formErrors = getFormErrors(["name", "supplier"], errors);
  const { loading, error, data } = useQuery(getSuppliers);
  console.log(data)
  console.log(loading)
  console.log(error)
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
        <Select
          fullWidth
          disabled={disabled}
          name="supplier"
          error={!!formErrors.supplier}
          value={dataa.supplier}
          // @ts-ignore
          onChange={onChange}
        ><MenuItem disabled selected>Suppliers</MenuItem>
          {
            data?.["suppliers"]?.["edges"] && data?.["suppliers"]?.["edges"].map((supplier)=>{
              return ( <MenuItem value={supplier?.node.id}>{supplier?.node.firstName+"  "+supplier?.node.lastName+" "
              +supplier?.node.phone}</MenuItem>)
            })
          }
        </Select>
      </CardContent>
    </Card>
  );
};

CreateWarehouseInfo.displayName = "CreateWarehouseInfo";
export default CreateWarehouseInfo;
