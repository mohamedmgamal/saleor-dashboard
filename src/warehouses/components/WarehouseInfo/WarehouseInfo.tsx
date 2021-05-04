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
export interface WarehouseInfoProps {
  data: {
    name: string;
    supplier: any;
  };
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  onChange: FormChange;
}

const WarehouseInfo: React.FC<WarehouseInfoProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "supplier"], errors);
  return (
    <Card data-test="generalInformationSection">
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
          name={"name" as keyof typeof data}
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          disabled={true}
          error={!!formErrors.supplier}
          fullWidth
          helperText={getWarehouseErrorMessage(formErrors.supplier, intl)}
          label={intl.formatMessage({
            defaultMessage: "Supplier"
          })}
          name={"supplier"}
          value={data.supplier.firstName+" "+data.supplier.lastName}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};

WarehouseInfo.displayName = "WarehouseInfo";
export default WarehouseInfo;
