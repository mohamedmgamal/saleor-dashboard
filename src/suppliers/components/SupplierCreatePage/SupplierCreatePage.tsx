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
import SupplierCreateDetails from "../SupplierCreateDetails";
import SupplierCreateNote from "../SupplierCreateNote/SupplierCreateNote";

export interface SupplierCreatePageFormData {
  SupplierFirstName: string;
  SupplierLastName: string;
  phone:string
  password:string
  email: string;
  note: string;
}


const initialForm: SupplierCreatePageFormData = {
  password:"",
  SupplierFirstName: "",
  SupplierLastName: "",
  email: "",
  note: "",
  phone: "",
};

export interface SupplierCreatePageProps {
  countries: SupplierCreateData_shop_countries[];
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: SupplierCreatePageFormData) => void;
}

const SupplierCreatePage: React.FC<SupplierCreatePageProps> = ({
  disabled,
  saveButtonBar,
  onBack,
  onSubmit
}: SupplierCreatePageProps) => {
  const intl = useIntl();
  const {
  } =(formData =>
    onSubmit({
      password:formData.password,
      phone:formData.phone,
      SupplierFirstName: formData.SupplierFirstName,
      SupplierLastName: formData.SupplierLastName,
      email: formData.email,
      note: formData.note
    })
  );
  const handleSubmit = (
    formData: SupplierCreatePageFormData
  ) => {
      onSubmit({
       phone:formData.phone,
        password:formData.password,
        SupplierFirstName: formData.SupplierFirstName,
        SupplierLastName: formData.SupplierLastName,
        email: formData.email,
        note: formData.note
      });

  };

  return (
    <Form initial={initialForm} onSubmit={handleSubmit} confirmLeave>
      {({ change, data, hasChanged, submit }) => (
          <Container>
            <AppHeader onBack={onBack}>
              <FormattedMessage {...sectionNames.suppliers} />
            </AppHeader>
            <PageHeader
              title={intl.formatMessage({
                defaultMessage: "Create Supplier",
                description: "page header"
              })}
            />
            <Grid>
              <div>
                <SupplierCreateDetails
                  data={data}
                  disabled={disabled}
                  errors={[]}
                  onChange={change}
                />
                <CardSpacer />
                <CardSpacer />
                <SupplierCreateNote
                  data={data}
                  disabled={disabled}
                  errors={[]}
                  onChange={change}
                />
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
SupplierCreatePage.displayName = "SupplierCreatePage";
export default SupplierCreatePage;
