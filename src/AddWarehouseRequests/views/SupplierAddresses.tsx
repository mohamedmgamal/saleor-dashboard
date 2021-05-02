// import DialogContentText from "@material-ui/core/DialogContentText";
// import ActionDialog from "@saleor/components/ActionDialog";
// import { WindowTitle } from "@saleor/components/WindowTitle";
// import useNavigator from "@saleor/hooks/useNavigator";
// import useNotifier from "@saleor/hooks/useNotifier";
// import useShop from "@saleor/hooks/useShop";
// import { commonMessages } from "@saleor/intl";
// import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
// import React from "react";
// import { FormattedMessage, useIntl } from "react-intl";
//
// import { maybe } from "../../misc";
// import SupplierAddressDialog from "../components/SupplierAddressDialog";
// import SupplierAddressListPage from "../components/SupplierAddressListPage";
// import {
//   TypedCreateSupplierAddressMutation,
//   TypedRemoveSupplierAddressMutation,
//   TypedSetSupplierDefaultAddressMutation,
//   TypedUpdateSupplierAddressMutation
// } from "../mutations";
// import { TypedSupplierAddressesQuery } from "../queries";
// import { CreateSupplierAddress } from "../types/CreateSupplierAddress";
// import { RemoveSupplierAddress } from "../types/RemoveSupplierAddress";
// import { SetSupplierDefaultAddress } from "../types/SetSupplierDefaultAddress";
// import { UpdateSupplierAddress } from "../types/UpdateSupplierAddress";
// import {
//   supplierAddressesUrl,
//   SupplierAddressesUrlDialog,
//   SupplierAddressesUrlQueryParams,
//   supplierUrl
// } from "../urls";
//
// interface SupplierAddressesProps {
//   id: string;
//   params: SupplierAddressesUrlQueryParams;
// }
//
// const SupplierAddresses: React.FC<SupplierAddressesProps> = ({
//   id,
//   params
// }) => {
//   const navigate = useNavigator();
//   const notify = useNotifier();
//   const shop = useShop();
//   const intl = useIntl();
//
//   const [openModal, closeModal] = createDialogActionHandlers<
//     SupplierAddressesUrlDialog,
//     SupplierAddressesUrlQueryParams
//   >(navigate, params => supplierAddressesUrl(id, params), params);
//
//   const handleSetAddressAsDefault = (data: SetSupplierDefaultAddress) => {
//     if (data.addressSetDefault.errors.length === 0) {
//       closeModal();
//       notify({
//         status: "success",
//         text: intl.formatMessage(commonMessages.savedChanges)
//       });
//     }
//   };
//
//   const handleAddressCreate = (data: CreateSupplierAddress) => {
//     if (data.addressCreate.errors.length === 0) {
//       closeModal();
//     }
//   };
//
//   const handleAddressUpdate = (data: UpdateSupplierAddress) => {
//     if (data.addressUpdate.errors.length === 0) {
//       closeModal();
//       notify({
//         status: "success",
//         text: intl.formatMessage(commonMessages.savedChanges)
//       });
//     }
//   };
//
//   const handleAddressRemove = (data: RemoveSupplierAddress) => {
//     if (data.addressDelete.errors.length === 0) {
//       closeModal();
//       notify({
//         status: "success",
//         text: intl.formatMessage(commonMessages.savedChanges)
//       });
//     }
//   };
//
//   return (
//     <TypedSetSupplierDefaultAddressMutation
//       onCompleted={handleSetAddressAsDefault}
//     >
//       {setsupplierDefaultAddress => (
//         <TypedCreateSupplierAddressMutation onCompleted={handleAddressCreate}>
//           {(CreateSupplierAddress, createSupplierAddressOpts) => (
//             <TypedUpdateSupplierAddressMutation
//               onCompleted={handleAddressUpdate}
//             >
//               {(updatesupplierAddress, updateSupplierAddressOpts) => (
//                 <TypedRemoveSupplierAddressMutation
//                   onCompleted={handleAddressRemove}
//                 >
//                   {(removesupplierAddress, removeSupplierAddressOpts) => (
//                     <TypedSupplierAddressesQuery variables={{ id }}>
//                       {supplierData => {
//                         const countryChoices = maybe(
//                           () =>
//                             shop.countries.map(country => ({
//                               code: country.code,
//                               label: country.country
//                             })),
//                           []
//                         );
//
//                         return (
//                           <>
//                             <WindowTitle
//                               title={maybe(() => supplierData.data.user.email)}
//                             />
//                             <SupplierAddressListPage
//                               Supplier={maybe(() => supplierData.data.user)}
//                               disabled={supplierData.loading}
//                               onAdd={() => openModal("add")}
//                               onBack={() => navigate(supplierUrl(id))}
//                               onEdit={id =>
//                                 openModal("edit", {
//                                   id
//                                 })
//                               }
//                               onRemove={id =>
//                                 openModal("remove", {
//                                   id
//                                 })
//                               }
//                               onSetAsDefault={(addressId, type) =>
//                                 setsupplierDefaultAddress({
//                                   variables: { addressId, type, userId: id }
//                                 })
//                               }
//                             />
//                             <SupplierAddressDialog
//                               address={undefined}
//                               confirmButtonState={
//                                 createSupplierAddressOpts.status
//                               }
//                               countries={countryChoices}
//                               errors={maybe(
//                                 () =>
//                                   createSupplierAddressOpts.data.addressCreate
//                                     .errors,
//                                 []
//                               )}
//                               open={params.action === "add"}
//                               variant="create"
//                               onClose={closeModal}
//                               onConfirm={input =>
//                                 CreateSupplierAddress({
//                                   variables: {
//                                     id,
//                                     input
//                                   }
//                                 })
//                               }
//                             />
//                             <SupplierAddressDialog
//                               address={maybe(() =>
//                                 supplierData.data.user.addresses.find(
//                                   addr => addr.id === params.id
//                                 )
//                               )}
//                               confirmButtonState={
//                                 updateSupplierAddressOpts.status
//                               }
//                               countries={countryChoices}
//                               errors={maybe(
//                                 () =>
//                                   updateSupplierAddressOpts.data.addressUpdate
//                                     .errors,
//                                 []
//                               )}
//                               open={params.action === "edit"}
//                               variant="edit"
//                               onClose={closeModal}
//                               onConfirm={input =>
//                                 updatesupplierAddress({
//                                   variables: {
//                                     id: params.id,
//                                     input
//                                   }
//                                 })
//                               }
//                             />
//                             <ActionDialog
//                               open={params.action === "remove"}
//                               variant="delete"
//                               title={intl.formatMessage({
//                                 defaultMessage: "Delete Address",
//                                 description: "dialog header"
//                               })}
//                               confirmButtonState={
//                                 removeSupplierAddressOpts.status
//                               }
//                               onClose={closeModal}
//                               onConfirm={() =>
//                                 removesupplierAddress({
//                                   variables: {
//                                     id: params.id
//                                   }
//                                 })
//                               }
//                             >
//                               <DialogContentText>
//                                 <FormattedMessage defaultMessage="Are you sure you want to delete this address from users address book?" />
//                               </DialogContentText>
//                             </ActionDialog>
//                           </>
//                         );
//                       }}
//                     </TypedSupplierAddressesQuery>
//                   )}
//                 </TypedRemoveSupplierAddressMutation>
//               )}
//             </TypedUpdateSupplierAddressMutation>
//           )}
//         </TypedCreateSupplierAddressMutation>
//       )}
//     </TypedSetSupplierDefaultAddressMutation>
//   );
// };
// export default SupplierAddresses;
