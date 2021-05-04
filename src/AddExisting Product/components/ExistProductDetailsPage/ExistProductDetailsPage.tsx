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
import { SupplierDetails_user } from "../../types/ExistingProductDetails";
// import NewProduct from "../NewProduct";
import ExistProductDetails from "../ExistProductDetails";
import ExitProductInfo from "../ExistProductInfo";
// import SupplierOrders from "../SupplierOrders";
// import SupplierStats from "../SupplierStats";
// import { date } from "@saleor/fixtures";

export interface ExistProductDetailsPageFormData {
  id: any
  status: string
  createdAt: string
  updatedAt: string
  type:string
  product: {
    name: string
    sku: string
    price: {
      currency: string
      amount: string
    }}
    supplier :{
    firstName:string
    lastName:string
    phone:string
  }
}
export interface ExistProductDetailsPageProps {
  request: SupplierDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: ExistProductDetailsPageFormData) => SubmitPromise;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}

const ExistProductDetailsPage: React.FC<ExistProductDetailsPageProps> = ({
  request,
  disabled,
  errors,
  saveButtonBar,
  onBack,
  onSubmit,
  // onViewAllOrdersClick,
  // onRowClick,
  // onAddressManageClick,
  onDelete
}: ExistProductDetailsPageProps) => {
  const intl = useIntl();
  return (
    <Form
      initial={{
        type:maybe(()=>request.type,""),
        id: maybe(() => request.id, ""),
        createdAt: maybe(() => request.createdAt, ""),
        product: maybe(() => request.product, {name:"",price:{amount:"",currency:""},sku:""}),
        status: maybe(() => request.status, ""),
        supplier: maybe(() => request.supplier, {firstName:"",lastName:"",phone:""}),
        updatedAt: maybe(() => request.updatedAt, ""),
      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.addExisting)}
          </AppHeader>
          <PageHeader title={request && request.product.name} />
          <Grid>
            <div>
              <ExistProductDetails
                Supplier={request}
                // data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <ExitProductInfo
                data={data}
                disabled={disabled}
                errors={errors}
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
ExistProductDetailsPage.displayName = "ExistProductDetailsPage";
export default ExistProductDetailsPage;
