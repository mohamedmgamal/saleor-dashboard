import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@saleor/components/ActionDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../misc";
import { orderListUrl, orderUrl } from "../../orders/urls";
import SupplierDetailsPage, {
  SupplierDetailsPageFormData
} from "../components/SupplierDetailsPage/SupplierDetailsPage";
import {
  TypedRemoveSupplierMutation,
  TypedUpdateSupplierMutation
} from "../mutations";
import { TypedSupplierDetailsQuery } from "../queries";
import { RemoveSupplier } from "../types/RemoveSupplier";
import { UpdateSupplier } from "../types/UpdateSupplier";
import {
  supplierAddressesUrl,
  supplierListUrl,
  supplierUrl,
  SupplierUrlQueryParams
} from "../urls";
interface SupplierDetailsViewProps {
  id: string;
  params: SupplierUrlQueryParams;
}

export const SupplierDetailsView: React.FC<SupplierDetailsViewProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleSupplierUpdateSuccess = (data: UpdateSupplier) => {
    if (data.SupplierUpdate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };
  const handleSupplierRemoveSuccess = (data: RemoveSupplier) => {
    if (data.SupplierDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Supplier Removed"
        })
      });
      navigate(supplierListUrl());
    }
  };

  const handleBack = () => navigate(supplierListUrl());
  return (
    <TypedRemoveSupplierMutation
      variables={{ id }}
      onCompleted={handleSupplierRemoveSuccess}
    >
      {(removeSupplier, removeSupplierOpts) => (
        <TypedUpdateSupplierMutation onCompleted={handleSupplierUpdateSuccess}>
          {(updateSupplier, updateSupplierOpts) => (
            <TypedSupplierDetailsQuery displayLoader variables={{ id }}>
              {SupplierDetails => {
                const supplier = SupplierDetails.data?.supplier;
                 if (supplier === null) {
                   return <NotFoundPage onBack={handleBack} />;
                 }

                const handleSubmit = async (
                  data: SupplierDetailsPageFormData
                ) => {
                  const result = await updateSupplier({
                    variables: {
                      id,
                      input: {
                        email: data.email,
                        firstName: data.firstName,
                        isActive: data.isActive,
                        lastName: data.lastName,
                        phone:data.phone

                      }
                    }
                  });

                  return result.data.SupplierUpdate.errors;
                };

                return (
                  <>
                    <WindowTitle
                      title={maybe(() => SupplierDetails.data.supplier.email)}
                    />
                    <SupplierDetailsPage
                      Supplier={maybe(() => SupplierDetails.data.supplier)}
                      disabled={
                        SupplierDetails.loading ||
                        updateSupplierOpts.loading ||
                        removeSupplierOpts.loading
                      }
                      errors={
                        // TODO: removed updateSupplierOpts.data?.SupplierUpdate.errors :: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                         []
                      }
                      saveButtonBar={updateSupplierOpts.status}
                      onAddressManageClick={() =>
                        navigate(supplierAddressesUrl(id))
                      }
                      onBack={handleBack}
                      onRowClick={id => navigate(orderUrl(id))}
                      onSubmit={handleSubmit}
                      onDelete={() =>
                        navigate(
                          supplierUrl(id, {
                            action: "remove"
                          })
                        )
                      }
                      onViewAllOrdersClick={() =>
                        navigate(
                          orderListUrl({
                            customer: maybe(
                              () => SupplierDetails.data.supplier.email
                            )
                          })
                        )
                      }
                    />
                    <ActionDialog
                      confirmButtonState={removeSupplierOpts.status}
                      onClose={() => navigate(supplierUrl(id), true)}
                      onConfirm={() => removeSupplier()}
                      title={intl.formatMessage({
                        defaultMessage: "Delete Supplier",
                        description: "dialog header"
                      })}
                      variant="delete"
                      open={params.action === "remove"}
                    >
                      <DialogContentText>
                        <FormattedMessage
                          defaultMessage="Are you sure you want to delete {email}?"
                          description="delete Supplier, dialog content"
                          values={{
                            email: (
                              <strong>
                                {maybe(
                                  () => SupplierDetails.data.supplier.email,
                                  "..."
                                )}
                              </strong>
                            )
                          }}
                        />
                      </DialogContentText>
                    </ActionDialog>
                  </>
                );
              }}
            </TypedSupplierDetailsQuery>
          )}
        </TypedUpdateSupplierMutation>
      )}
    </TypedRemoveSupplierMutation>
  );
};
export default SupplierDetailsView;
