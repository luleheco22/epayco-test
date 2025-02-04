import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Formik } from "formik";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";

import { RechargeWalletSchema } from "../../schemas/index";
import { IRecharge } from "../../interfaces/index";
import { useWallet } from "../../context/walletContext";

const RechargeWallet: React.FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { rechargeWallet } = useWallet();

  const initialValues = {
    document: "",
    phone: "",
    balance: 0,
  };

  const handleRechargeWallet = async (values: IRecharge) => {
    setLoading(true);
    try {
      await rechargeWallet(values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Button
        className="ml-20 text-sm"
        color="primary"
        size="sm"
        variant="flat"
        onPress={onOpen}
      >
        Recharge Funds
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-green-900">
            Recharge Balance
          </ModalHeader>

          <Formik
            initialValues={initialValues}
            validationSchema={RechargeWalletSchema}
            onSubmit={handleRechargeWallet}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => {
              return (
                <>
                  <ModalBody className="">
                    <div className="my-2">
                      <Input
                        isRequired
                        errorMessage={touched.document && errors.document}
                        isInvalid={!!errors.document && !!touched.document}
                        label="Document"
                        name="document"
                        placeholder="Enter your document number"
                        type="text"
                        value={values.document}
                        variant="bordered"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="my-2">
                      <Input
                        isRequired
                        errorMessage={touched.phone && errors.phone}
                        isInvalid={!!errors.phone && !!touched.phone}
                        label="Phone"
                        name="phone"
                        placeholder="Write your phone"
                        type="text"
                        value={values.phone}
                        variant="bordered"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="my-2">
                      <Input
                        isRequired
                        errorMessage={touched.balance && errors.balance}
                        isInvalid={!!errors.balance && !!touched.balance}
                        label="Balance"
                        name="balance"
                        placeholder="Write your balance"
                        type="number"
                        value={values.balance.toString()}
                        variant="bordered"
                        onChange={handleChange}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="bg-blue-100 text-blue-900"
                      isDisabled={loading}
                      onPress={() => handleSubmit()}
                    >
                      {loading ? (
                        <Spinner color="current" size="sm" />
                      ) : (
                        "Recharge"
                      )}
                    </Button>
                  </ModalFooter>
                </>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RechargeWallet;
