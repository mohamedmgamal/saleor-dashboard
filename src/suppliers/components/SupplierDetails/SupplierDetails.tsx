import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import { ControlledCheckbox } from "@saleor/components/ControlledCheckbox";
import Skeleton from "@saleor/components/Skeleton";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { maybe } from "@saleor/misc";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import moment from "moment-timezone";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { SupplierDetails_user } from "../../types/SupplierDetails";

const useStyles = makeStyles(
  theme => ({
    cardTitle: {
      height: 72
    },
    checkbox: {
      marginBottom: theme.spacing()
    },
    content: {
      paddingTop: theme.spacing()
    },
    subtitle: {
      marginTop: theme.spacing()
    }
  }),
  { name: "SupplierDetails" }
);

export interface SupplierDetailsProps {
  Supplier: SupplierDetails_user;
  data: {
    isActive: boolean;
    note: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = props => {
  const { Supplier, data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["note"], errors);

  return (
    <Card>
      <CardTitle
        className={classes.cardTitle}
        title={
          <>
            {maybe<React.ReactNode>(() => Supplier.email, <Skeleton />)}
            {Supplier && Supplier.dateJoined ? (
              <Typography
                className={classes.subtitle}
                variant="caption"
                component="div"
              >
                <FormattedMessage
                  defaultMessage="Active member since {date}"
                  description="section subheader"
                  values={{
                    date: moment(Supplier.dateJoined).format("MMM YYYY")
                  }}
                />
              </Typography>
            ) : (
              <Skeleton style={{ width: "10rem" }} />
            )}
          </>
        }
      />
      <CardContent className={classes.content}>
        <ControlledCheckbox
          checked={data.isActive}
          className={classes.checkbox}
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "User account active",
            description: "check to mark this account as active"
          })}
          name="isActive"
          onChange={onChange}
        />
        <TextField
          disabled={disabled}
          error={!!formErrors.note}
          fullWidth
          multiline
          helperText={getAccountErrorMessage(formErrors.note, intl)}
          name="note"
          label={intl.formatMessage({
            defaultMessage: "Note",
            description: "note about Supplier"
          })}
          value={data.note}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
SupplierDetails.displayName = "SupplierDetails";
export default SupplierDetails;
