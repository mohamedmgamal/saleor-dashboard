import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppHeader from "@saleor/components/AppHeader";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe, renderCollection } from "../../../misc";
import { AddressTypeEnum } from "../../../types/globalTypes";
import { SupplierAddresses_user } from "../../types/SupplierAddresses";
import SupplierAddress from "../SupplierAddress/SupplierAddress";

export interface SupplierAddressListPageProps {
  Supplier: SupplierAddresses_user;
  disabled: boolean;
  onAdd: () => void;
  onBack: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onSetAsDefault: (id: string, type: AddressTypeEnum) => void;
}

const useStyles = makeStyles(
  theme => ({
    addButton: {
      marginTop: theme.spacing(2)
    },
    description: {
      marginTop: theme.spacing(1)
    },
    empty: {
      margin: `${theme.spacing(13)}px auto 0`,
      textAlign: "center",
      width: 600
    },
    root: {
      columnGap: theme.spacing(3),
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      rowGap: theme.spacing(3)
    }
  }),
  { name: "SupplierAddressListPage" }
);

const SupplierAddressListPage: React.FC<SupplierAddressListPageProps> = props => {
  const {
    Supplier,
    disabled,
    onAdd,
    onBack,
    onEdit,
    onRemove,
    onSetAsDefault
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  const isEmpty = maybe(() => Supplier.addresses.length) === 0;
  const fullName = maybe(
    () => [Supplier.firstName, Supplier.lastName].join(" "),
    "..."
  );

  return (
    <Container>
      <AppHeader onBack={onBack}>
        <FormattedMessage
          defaultMessage="{fullName} Details"
          description="Supplier details, header"
          values={{
            fullName
          }}
        />
      </AppHeader>
      {!isEmpty && (
        <PageHeader
          title={intl.formatMessage(
            {
              defaultMessage: "{fullName}'s Address Book",
              description: "Supplier's address book, header"
            },
            {
              fullName
            }
          )}
        >
          <Button color="primary" variant="contained" onClick={onAdd}>
            <FormattedMessage
              defaultMessage="Add address"
              description="button"
            />
          </Button>
        </PageHeader>
      )}
      {isEmpty ? (
        <div className={classes.empty}>
          <Typography variant="h5">
            <FormattedMessage defaultMessage="There is no address to show for this Supplier" />
          </Typography>
          <Typography className={classes.description}>
            <FormattedMessage defaultMessage="This Supplier doesn’t have any adresses added to his address book. You can add address using the button below." />
          </Typography>
          <Button
            className={classes.addButton}
            color="primary"
            variant="contained"
            onClick={onAdd}
          >
            <FormattedMessage
              defaultMessage="Add address"
              description="button"
            />
          </Button>
        </div>
      ) : (
        <div className={classes.root}>
          {renderCollection(
            maybe(() => Supplier.addresses),
            (address, addressNumber) => (
              <SupplierAddress
                address={address}
                addressNumber={addressNumber + 1}
                disabled={disabled}
                isDefaultBillingAddress={
                  maybe(() => Supplier.defaultBillingAddress.id) ===
                  maybe(() => address.id)
                }
                isDefaultShippingAddress={
                  maybe(() => Supplier.defaultShippingAddress.id) ===
                  maybe(() => address.id)
                }
                onEdit={() => onEdit(address.id)}
                onRemove={() => onRemove(address.id)}
                onSetAsDefault={type => onSetAsDefault(address.id, type)}
                key={maybe(() => address.id, "skeleton")}
              />
            )
          )}
        </div>
      )}
    </Container>
  );
};
SupplierAddressListPage.displayName = "SupplierAddressListPage";
export default SupplierAddressListPage;
