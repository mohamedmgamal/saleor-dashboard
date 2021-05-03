import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddressFormatter from "@saleor/components/AddressFormatter";
import CardTitle from "@saleor/components/CardTitle";
import { Hr } from "@saleor/components/Hr";
import { buttonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../../misc";
import { SupplierDetails_user } from "../../types/ExistingProductDetails";

const useStyles = makeStyles(
  theme => ({
    label: {
      fontWeight: 600,
      marginBottom: theme.spacing(1)
    }
  }),
  { name: "SupplierAddresses" }
);

export interface SupplierAddressesProps {
  Supplier: SupplierDetails_user;
  disabled: boolean;
  onAddressManageClick: () => void;
}

const SupplierAddresses: React.FC<SupplierAddressesProps> = props => {
  const { Supplier, disabled, onAddressManageClick } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Address Information",
          description: "header"
        })}
        toolbar={
          <Button
            color="primary"
            disabled={disabled}
            variant="text"
            onClick={onAddressManageClick}
          >
            <FormattedMessage {...buttonMessages.manage} />
          </Button>
        }
      />
      // @ts-ignore
      {maybe(() => Supplier.defaultBillingAddress.id) !==
      // @ts-ignore
      maybe(() => Supplier.defaultShippingAddress.id) ? (
        <>
          // @ts-ignore
          {maybe(() => Supplier.defaultBillingAddress) !== null && (
            <CardContent>
              <Typography className={classes.label}>
                <FormattedMessage
                  defaultMessage="Billing Address"
                  description="subsection header"
                />
              </Typography>
              <AddressFormatter
                // @ts-ignore
                address={maybe(() => Supplier.defaultBillingAddress)}
              />
            </CardContent>
          )}
          {maybe(
            () =>
              // @ts-ignore
              Supplier.defaultBillingAddress && Supplier.defaultShippingAddress
          ) && <Hr />}
          // @ts-ignore
          {maybe(() => Supplier.defaultShippingAddress) && (
            <CardContent>
              <Typography className={classes.label}>
                <FormattedMessage
                  defaultMessage="Shipping Address"
                  description="subsection header"
                />
              </Typography>
              <AddressFormatter
                // @ts-ignore
                address={maybe(() => Supplier.defaultShippingAddress)}
              />
            </CardContent>
          )}
        </>
      ) : // @ts-ignore
      maybe(() => Supplier.defaultBillingAddress) === null &&
        // @ts-ignore
        maybe(() => Supplier.defaultShippingAddress) === null ? (
        <CardContent>
          <Typography>
            <FormattedMessage defaultMessage="This Supplier has no addresses yet" />
          </Typography>
        </CardContent>
      ) : (
        <CardContent>
          <Typography className={classes.label}>
            <FormattedMessage
              defaultMessage="Address"
              description="subsection header"
            />
          </Typography>
          <AddressFormatter
            // @ts-ignore
            address={maybe(() => Supplier.defaultBillingAddress)}
          />
        </CardContent>
      )}
    </Card>
  );
};
SupplierAddresses.displayName = "SupplierAddresses";
export default SupplierAddresses;
