import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "../../misc";
import SupplierCreatePage from "../components/SupplierCreatePage";
import { TypedCreateSupplierMutation } from "../mutations";
import { TypedSupplierCreateDataQuery } from "../queries";
import { CreateSupplier } from "../types/CreateSupplier";
import { supplierListUrl, supplierUrl } from "../urls";

export const SupplierCreate: React.FC<{}> = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleCreateSupplierSuccess = (data: CreateSupplier) => {
    if (data.SupplierCreate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Supplier created"
        })
      });
      navigate(supplierUrl(data.SupplierCreate.user.id));
    }
  };
  return (
    <TypedSupplierCreateDataQuery displayLoader>
      {({ data, loading }) => (
        <TypedCreateSupplierMutation onCompleted={handleCreateSupplierSuccess}>
          {(createSupplier, createSupplierOpts) => (
            <>
              <WindowTitle
                title={intl.formatMessage({
                  defaultMessage: "Create Supplier",
                  description: "window title"
                })}
              />
              <SupplierCreatePage
                countries={maybe(() => data.shop.countries, [])}
                disabled={loading || createSupplierOpts.loading}
                errors={createSupplierOpts.data?.SupplierCreate.errors || []}
                saveButtonBar={createSupplierOpts.status}
                onBack={() => navigate(supplierListUrl())}
                onSubmit={formData => {
                  createSupplier({
                    variables: {
                      input: {
                        defaultBillingAddress: formData.address,
                        defaultShippingAddress: formData.address,
                        email: formData.email,
                        firstName: formData.SupplierFirstName,
                        lastName: formData.SupplierLastName,
                        note: formData.note
                      }
                    }
                  });
                }}
              />
            </>
          )}
        </TypedCreateSupplierMutation>
      )}
    </TypedSupplierCreateDataQuery>
  );
};
export default SupplierCreate;
