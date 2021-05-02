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
import { SupplierDetails_user } from "../../types/DeleteRequestDetails";
// import NewProduct from "../NewProduct";
import SupplierDetails from "../SupplierDetails";
import RequestInfo from "../RequestInfo";
// import SupplierOrders from "../SupplierOrders";
// import SupplierStats from "../SupplierStats";
// import { date } from "@saleor/fixtures";

export interface SupplierDetailsPageFormData {
  id:string
  status:string
  createdAt:string
  updatedAt:string
  warehouse:{
    name:string
    companyName:string
    address:{
      streetAddress1:string
      country:
        {
          country:string
        }
      governorate:string
      city:string
      cityArea:string
    }
  }
  supplier :{
    firstName:string
    lastName:string
    phone:string
  }
}
export interface SupplierDetailsPageProps {
  request: SupplierDetails_user;
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

const RequestDetailsPage: React.FC<SupplierDetailsPageProps> = ({
  request,
  disabled,
  errors,
  saveButtonBar,
  onBack,
  onSubmit,
  onDelete
}: SupplierDetailsPageProps) => {
  const intl = useIntl();
  // @ts-ignore
  return (
    <Form
      initial={{
        id:maybe(()=>request.id,""),
        status: maybe(() => request.status, ""),
        warehouse:maybe(()=>request.warehouse,null),
        createdAt:maybe(()=>request.createdAt,""),
        supplier:maybe(()=>request.supplier,null),
        updatedAt:maybe(()=>request.updatedAt,""),
        }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.deleteWareHouse)}
          </AppHeader>
          <PageHeader title={request && request.warehouse.name} />
          <Grid>
            <div>
              <SupplierDetails
                Supplier={request}
                // data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <RequestInfo
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
RequestDetailsPage.displayName = "RequestDetailsPage";
export default RequestDetailsPage;
