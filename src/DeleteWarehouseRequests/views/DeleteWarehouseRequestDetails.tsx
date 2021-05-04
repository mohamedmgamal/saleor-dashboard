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
import RequestDetailsPage, {
  SupplierDetailsPageFormData
} from "../components/DeleteWarehouseRequestDetailsPage/RequestDetailsPage";
import {
  TypedRemoveSupplierMutation,
  TypedUpdateRequestMutation
} from "../mutations";
import { TypedRequestDetailsQuery } from "../queries";
import { UpdateRequest } from "../types/DeleteRequestDetails";
import { RemoveSupplier } from "../types/RemoveSupplier";
import {
  deleteWarehouseListUrl,
  DeleteWarehouseUrlQueryParams,
  existProductUrl,
  newProductAddressesUrl
} from "../urls";
interface RequestDetailsViewProps {
  id: string;
  params: DeleteWarehouseUrlQueryParams;
}

export const RequestDetailsView: React.FC<RequestDetailsViewProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleSupplierUpdateSuccess = (data: UpdateRequest) => {
    // console.log(data)
    if (data.changeStatusDeleteWarehouse.errors.length < 1) {
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
      navigate(deleteWarehouseListUrl());
    }
  };
  const handleBack = () => navigate(deleteWarehouseListUrl());
  return (
    <TypedRemoveSupplierMutation
      variables={{ id }}
      onCompleted={handleSupplierRemoveSuccess}
    >
      {(removeSupplier, removeSupplierOpts) => (
        <TypedUpdateRequestMutation onCompleted={handleSupplierUpdateSuccess}>
          {(updateSupplier, updateSupplierOpts) => (
            <TypedRequestDetailsQuery displayLoader variables={{ id }}>
              {result => {
                const Request = result.data?.requestDeleteWarehouse;
                if (Request === null) {
                  return <NotFoundPage onBack={handleBack} />;
                }

                const handleSubmit = async (
                  data: SupplierDetailsPageFormData
                ) => {
                  const result = await updateSupplier({
                    variables: {
                      input: {
                        requestId: data.id,
                        status: data.status
                      }
                    }
                  });

                  return result.data.changeStatusDeleteWarehouse.errors;
                };

                return (
                  <>
                    <WindowTitle
                      title={maybe(
                        () => result.data.requestDeleteWarehouse.warehouse.name
                      )}
                    />
                    <RequestDetailsPage
                      request={maybe(() => result.data.requestDeleteWarehouse)}
                      disabled={
                        result.loading ||
                        updateSupplierOpts.loading ||
                        removeSupplierOpts.loading
                      }
                      errors={
                        // TODO: removed updateSupplierOpts.data?.SupplierUpdate.errors :: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                        updateSupplierOpts.data?.changeStatusDeleteWarehouse
                          .errors || []
                      }
                      saveButtonBar={updateSupplierOpts.status}
                      onAddressManageClick={() =>
                        navigate(newProductAddressesUrl(id))
                      }
                      onBack={handleBack}
                      onRowClick={id => navigate(orderUrl(id))}
                      onSubmit={handleSubmit}
                      onDelete={() =>
                        navigate(
                          existProductUrl(id, {
                            action: "remove"
                          })
                        )
                      }
                      onViewAllOrdersClick={() =>
                        navigate(
                          orderListUrl({
                            customer: maybe(
                              () =>
                                result.data.requestDeleteWarehouse.warehouse
                                  .name
                            )
                          })
                        )
                      }
                    />
                    <ActionDialog
                      confirmButtonState={removeSupplierOpts.status}
                      onClose={() => navigate(existProductUrl(id), true)}
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
                                  () =>
                                    result.data.requestDeleteWarehouse.warehouse
                                      .name,
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
            </TypedRequestDetailsQuery>
          )}
        </TypedUpdateRequestMutation>
      )}
    </TypedRemoveSupplierMutation>
  );
};
export default RequestDetailsView;
