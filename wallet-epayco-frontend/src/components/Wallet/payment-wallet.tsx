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
import { toast } from "react-toastify";

import { PaySchema } from "../../schemas/index";
import { useWallet } from "../../context/walletContext";
import { IPay } from '../../interfaces/index';

const PaymentWallet: React.FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { pay, balance } = useWallet();

  const initialValues: IPay = {
    document: "",
    amount: 0,
  };

  const handleRechargeWallet = async (values: IPay) => {
    if (balance <= 0) {
      toast.warn("Insufficient funds", {
        position: "top-center",
      });

      return;
    }
    setLoading(true);
    try {
      await pay(values);
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
        className="text-sm"
        color="success"
        size="sm"
        variant="flat"
        onPress={onOpen}
      >
        Pay
      </Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-green-900">
            Pay
          </ModalHeader>

          <Formik
            initialValues={initialValues}
            validationSchema={PaySchema}
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
                        errorMessage={touched.amount && errors.amount}
                        isInvalid={!!errors.amount && !!touched.amount}
                        label="Amount"
                        name="amount"
                        placeholder="amount"
                        type="number"
                        value={values.amount.toString()}
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
                      {loading ? <Spinner color="current" size="sm" /> : "Pay"}
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

export default PaymentWallet;
