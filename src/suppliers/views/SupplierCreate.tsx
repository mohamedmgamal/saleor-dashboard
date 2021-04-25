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
    if (data.supplierCreate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Supplier created"
        })
      });
      navigate(supplierUrl(data.supplierCreate.supplier.id));
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
                // ToDO: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                   errors={createSupplierOpts.data?.supplierCreate.errors||  []}
                saveButtonBar={createSupplierOpts.status}
                onBack={() => navigate(supplierListUrl())}
                onSubmit={formData => {
                  createSupplier({
                    variables: {
                      input: {
                        //   defaultBillingAddress: formData.address,
                        //   defaultShippingAddress: formData.address,
                        email: formData.email,
                        firstName: formData.SupplierFirstName,
                        lastName: formData.SupplierLastName,
                        note: formData.note,
                        phone: formData.phone,
                        password: formData.password,
                        isActive: true
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
