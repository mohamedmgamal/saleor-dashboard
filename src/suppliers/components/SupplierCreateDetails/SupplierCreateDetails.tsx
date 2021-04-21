import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@saleor/components/CardTitle";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import React from "react";
import { useIntl } from "react-intl";

import { SupplierCreatePageFormData } from "../SupplierCreatePage";

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "SupplierCreateDetails" }
);

export interface SupplierCreateDetailsProps {
  data: SupplierCreatePageFormData;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SupplierCreateDetails: React.FC<SupplierCreateDetailsProps> = props => {
  const { data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["SupplierFirstName", "SupplierLastName", "email"],
    errors
  );

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Supplier Overview",
          description: "header"
        })}
      />
      <CardContent>
        <div className={classes.root}>
          <TextField
            disabled={disabled}
            error={!!formErrors.SupplierFirstName}
            fullWidth
            name="SupplierFirstName"
            label={intl.formatMessage(commonMessages.firstName)}
            helperText={getAccountErrorMessage(
              formErrors.SupplierFirstName,
              intl
            )}
            type="text"
            value={data.SupplierFirstName}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.SupplierLastName}
            fullWidth
            name="SupplierLastName"
            label={intl.formatMessage(commonMessages.lastName)}
            helperText={getAccountErrorMessage(
              formErrors.SupplierLastName,
              intl
            )}
            type="text"
            value={data.SupplierLastName}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.email}
            fullWidth
            name="email"
            label={intl.formatMessage(commonMessages.email)}
            helperText={getAccountErrorMessage(formErrors.email, intl)}
            type="email"
            value={data.email}
            onChange={onChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

SupplierCreateDetails.displayName = "SupplierCreateDetails";
export default SupplierCreateDetails;
