import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import useAddressValidation from "@saleor/hooks/useAddressValidation";
import { sectionNames } from "@saleor/intl";
import { AddressInput } from "@saleor/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { AddressTypeInput } from "../../types";
import { SupplierCreateData_shop_countries } from "../../types/SupplierCreateData";
import SupplierCreateAddress from "../SupplierCreateAddress/SupplierCreateAddress";
import SupplierCreateDetails from "../SupplierCreateDetails";
import SupplierCreateNote from "../SupplierCreateNote/SupplierCreateNote";

export interface SupplierCreatePageFormData {
  SupplierFirstName: string;
  SupplierLastName: string;
  email: string;
  note: string;
}
export interface SupplierCreatePageSubmitData
  extends SupplierCreatePageFormData {
  address: AddressInput;
}

const initialForm: SupplierCreatePageFormData & AddressTypeInput = {
  city: "",
  cityArea: "",
  companyName: "",
  country: "",
  countryArea: "",
  SupplierFirstName: "",
  SupplierLastName: "",
  email: "",
  firstName: "",
  lastName: "",
  note: "",
  phone: "",
  postalCode: "",
  streetAddress1: "",
  streetAddress2: ""
};

export interface SupplierCreatePageProps {
  countries: SupplierCreateData_shop_countries[];
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: SupplierCreatePageSubmitData) => void;
}

const SupplierCreatePage: React.FC<SupplierCreatePageProps> = ({
  countries,
  disabled,
  errors: apiErrors,
  saveButtonBar,
  onBack,
  onSubmit
}: SupplierCreatePageProps) => {
  const intl = useIntl();

  const [countryDisplayName, setCountryDisplayName] = React.useState("");
  const countryChoices = countries.map(country => ({
    label: country.country,
    value: country.code
  }));
  const {
    errors: validationErrors,
    submit: handleSubmitWithAddress
  } = useAddressValidation<SupplierCreatePageFormData, void>(formData =>
    onSubmit({
      address: {
        city: formData.city,
        cityArea: formData.cityArea,
        companyName: formData.companyName,
        country: formData.country,
        countryArea: formData.countryArea,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        postalCode: formData.postalCode,
        streetAddress1: formData.streetAddress1,
        streetAddress2: formData.streetAddress2
      },
      SupplierFirstName: formData.SupplierFirstName,
      SupplierLastName: formData.SupplierLastName,
      email: formData.email,
      note: formData.note
    })
  );

  const errors = [...apiErrors, ...validationErrors];

  const handleSubmit = (
    formData: SupplierCreatePageFormData & AddressTypeInput
  ) => {
    const areAddressInputFieldsModified = ([
      "city",
      "companyName",
      "country",
      "countryArea",
      "firstName",
      "lastName",
      "phone",
      "postalCode",
      "streetAddress1",
      "streetAddress2"
    ] as Array<keyof AddressTypeInput>)
      .map(key => formData[key])
      .some(field => field !== "");

    if (areAddressInputFieldsModified) {
      handleSubmitWithAddress(formData);
    } else {
      onSubmit({
        address: null,
        SupplierFirstName: formData.SupplierFirstName,
        SupplierLastName: formData.SupplierLastName,
        email: formData.email,
        note: formData.note
      });
    }
  };

  return (
    <Form initial={initialForm} onSubmit={handleSubmit} confirmLeave>
      {({ change, data, hasChanged, submit }) => {
        const handleCountrySelect = createSingleAutocompleteSelectHandler(
          change,
          setCountryDisplayName,
          countryChoices
        );

        return (
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
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <SupplierCreateAddress
                  countries={countryChoices}
                  countryDisplayName={countryDisplayName}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  onCountryChange={handleCountrySelect}
                />
                <CardSpacer />
                <SupplierCreateNote
                  data={data}
                  disabled={disabled}
                  errors={errors}
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
        );
      }}
    </Form>
  );
};
SupplierCreatePage.displayName = "SupplierCreatePage";
export default SupplierCreatePage;
