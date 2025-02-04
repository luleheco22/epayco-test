import React, { useState } from "react";
import { Formik } from "formik";
import { Spinner } from "@heroui/spinner";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";
import { useWallet } from "../../context/walletContext";

import { IRegisterForm } from "@/interfaces";
import { RegisterSchema } from "@/schemas";

const RegisterForm: React.FC = () => {
  const { register } = useWallet();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityRepeat = () => setIsVisibleRepeat(!isVisibleRepeat);
  const [loading, setLoading] = useState(false);

  const initialValues: IRegisterForm = {
    document: "",
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegister = async (
    values: IRegisterForm,
    resetForm: () => void,
  ) => {
    setLoading(true);
    const { confirmPassword, ...data } = values;

    try {
      await register(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, { resetForm }) => handleRegister(values, resetForm)}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div className="sign-up-form flex flex-col justify-center">
            <div className="mb-5">
              <img alt="Logo" height={150} src="/logo_epayco.png" width={150} />
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-6">
                <Input
                  isRequired
                  className="max-w-xs"
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
              <div className="w-full md:w-1/2 px-2 mb-6">
                <Input
                  isRequired
                  className="max-w-xs"
                  errorMessage={touched.name && errors.name}
                  isInvalid={!!errors.name && !!touched.name}
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  variant="bordered"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-6">
                <Input
                  isRequired
                  className="max-w-xs"
                  errorMessage={touched.email && errors.email}
                  isInvalid={!!errors.email && !!touched.email}
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  type="mail"
                  value={values.email}
                  variant="bordered"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-6">
                <Input
                  isRequired
                  className="max-w-xs"
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
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Input
                  isRequired
                  className="max-w-xs"
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  errorMessage={touched.password && errors.password}
                  isInvalid={!!errors.password && !!touched.password}
                  label="Password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  type={isVisible ? "text" : "password"}
                  value={values.password}
                  variant="bordered"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Input
                  isRequired
                  className="max-w-xs"
                  endContent={
                    <button
                      aria-label="toggle repeat password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityRepeat}
                    >
                      {isVisibleRepeat ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  errorMessage={
                    touched.confirmPassword && errors.confirmPassword
                  }
                  isInvalid={
                    !!errors.confirmPassword && !!touched.confirmPassword
                  }
                  label="Repeat Password"
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  type={isVisibleRepeat ? "text" : "password"}
                  value={values.confirmPassword}
                  variant="bordered"
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button
              className="text-white text-center bg-green-300 hover:bg-green-400 focus:ring-4 focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onPress={() => handleSubmit()}
            >
              {loading ? <Spinner color="primary" /> : "Register"}
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
