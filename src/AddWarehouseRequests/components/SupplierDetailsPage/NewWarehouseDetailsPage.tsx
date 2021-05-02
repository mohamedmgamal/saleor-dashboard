import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import SaveButtonBar from "@saleor/components/OnlySaveButton";
import PageHeader from "@saleor/components/PageHeader";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "../../../misc";
import { requestNewProductDetails_user } from "../../types/NewWarehouseDetails";
import SupplierDetails from "../SupplierDetails";
import SupplierInfo from "../SupplierInfo";
export interface NewWarehouseDetailsPageFormData {
  id:string
  status: string
  createdAt: string
  updatedAt: string
  address: {
    country:
      {
        country: string
      }
    governorate: string
    city: string
    cityArea: string
    streetAddress1: string
  }
  name: string
  supplier: {
    firstName:string;
    lastName:string;
    phone:string}
}
export interface WarehouseDetailsPageProps {
  Request: requestNewProductDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: NewWarehouseDetailsPageFormData) => SubmitPromise;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}

const NewWarehouseDetailsPage: React.FC<WarehouseDetailsPageProps> = ({
  Request,
  disabled,
  errors,
  saveButtonBar,
  onBack,
  onSubmit,
  onDelete
}: WarehouseDetailsPageProps) => {
  const intl = useIntl();
  return (
    <Form
      initial={{
        id: maybe(() => Request.id, ""),
        createdAt: maybe(() => Request.createdAt, ""),
        name: maybe(() => Request.name, ""),
        address: maybe(() => Request.address, null),
        status: maybe(() => Request.status, ""),
        supplier: maybe(() => Request.supplier, {firstName:"",lastName:"",phone:""}),
        updatedAt: maybe(() => Request.updatedAt, ""),
      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.addWareHouse)}
          </AppHeader>
          <PageHeader title={Request&&Request.name} />
          <Grid>
            <div>
              <SupplierDetails
                NewProduct={Request}
               // data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <SupplierInfo
                data={data}
                onChange={change}
              />
              <CardSpacer />
              {/* <SupplierStats Supplier={Supplier} />*/}
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
NewWarehouseDetailsPage.displayName = "NewWarehouseDetailsPage";
export default NewWarehouseDetailsPage;
