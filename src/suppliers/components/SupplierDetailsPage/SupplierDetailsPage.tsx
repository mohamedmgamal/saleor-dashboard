import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import { getUserName, maybe } from "../../../misc";
import { SupplierDetails_user } from "../../types/SupplierDetails";
import SupplierAddresses from "../SupplierAddresses";
import SupplierDetails from "../SupplierDetails";
import SupplierInfo from "../SupplierInfo";
import SupplierOrders from "../SupplierOrders";
import SupplierStats from "../SupplierStats";

export interface SupplierDetailsPageFormData {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  note: string;
}

export interface SupplierDetailsPageProps {
  Supplier: SupplierDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: SupplierDetailsPageFormData) => SubmitPromise;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}

const SupplierDetailsPage: React.FC<SupplierDetailsPageProps> = ({
  Supplier,
  disabled,
  errors,
  saveButtonBar,
  onBack,
  onSubmit,
  onViewAllOrdersClick,
  onRowClick,
  onAddressManageClick,
  onDelete
}: SupplierDetailsPageProps) => {
  const intl = useIntl();
console.log("Hello from SupplierDetailsPage")
  return (
    <Form
      initial={{
        email: maybe(() => Supplier.email, ""),
        firstName: maybe(() => Supplier.firstName, ""),
        isActive: maybe(() => Supplier.isActive, false),
        lastName: maybe(() => Supplier.lastName, ""),
        note: maybe(() => Supplier.note, "")
      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.suppliers)}
          </AppHeader>
          <PageHeader title={getUserName(Supplier, true)} />
          <Grid>
            <div>
              <SupplierDetails
                Supplier={Supplier}
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <SupplierInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <SupplierOrders
                orders={maybe(() =>
                  Supplier.orders.edges.map(edge => edge.node)
                )}
                onViewAllOrdersClick={onViewAllOrdersClick}
                onRowClick={onRowClick}
              />
            </div>
            <div>
              <SupplierAddresses
                Supplier={Supplier}
                disabled={disabled}
                onAddressManageClick={onAddressManageClick}
              />
              <CardSpacer />
              <SupplierStats Supplier={Supplier} />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBar}
            onSave={submit}
            onCancel={onBack}
            onDelete={onDelete}
          />
        </Container>
      )}
    </Form>
  );
};
SupplierDetailsPage.displayName = "SupplierDetailsPage";
export default SupplierDetailsPage;
