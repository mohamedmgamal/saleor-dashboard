import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { SupplierCreateData_shop_countries } from "../../types/SupplierCreateData";
import WarehouseMangerCreateDetails from "../WarehouseManagerCreateDetails";
// import SupplierCreateNote from "../SupplierCreateNote/SupplierCreateNote";

export interface SupplierCreatePageFormData {
  FirstName: string;
  LastName: string;
  phone: string;
  password: string;
  email: string;
  supplier: string;
}

const initialForm: SupplierCreatePageFormData = {
  password: "",
  FirstName: "",
  LastName: "",
  email: "",
  phone: "",
  supplier: ""
};

export interface SupplierCreatePageProps {
  countries: SupplierCreateData_shop_countries[];
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: SupplierCreatePageFormData) => void;
}

const WarehouseMangerCreatePage: React.FC<SupplierCreatePageProps> = ({
  disabled,
  errors: apiErrors,
  saveButtonBar,
  onBack,
  onSubmit
}: SupplierCreatePageProps) => {
  const intl = useIntl();
  const {} = formData =>
    onSubmit({
      password: formData.password,
      phone: formData.phone,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      email: formData.email,
      supplier: formData.supplier
    });
  const handleSubmit = (formData: SupplierCreatePageFormData) => {
    onSubmit({
      phone: formData.phone,
      password: formData.password,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      email: formData.email,
      supplier: formData.supplier
    });
  };
  const errors = [...apiErrors];
  return (
    <Form initial={initialForm} onSubmit={handleSubmit} confirmLeave>
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            <FormattedMessage {...sectionNames.WarehouseManagers} />
          </AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Create Warehouse Manager",
              description: "page header"
            })}
          />
          <Grid>
            <div>
              <WarehouseMangerCreateDetails
                dataa={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBar}
            onSave={submit}
            onCancel={onBack}
          />
        </Container>
      )}
    </Form>
  );
};
WarehouseMangerCreatePage.displayName = "WarehouseMangerCreatePage";
export default WarehouseMangerCreatePage;
