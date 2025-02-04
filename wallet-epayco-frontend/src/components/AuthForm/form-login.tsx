import React, { useState } from "react";
import { Formik } from "formik";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { useNavigate } from "react-router-dom";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

import { LoginSchema } from "@/schemas";
import { ILoginForm } from "@/interfaces";
import { useWallet } from "@/context/walletContext";

const FormLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useWallet();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const initialValues: ILoginForm = {
    email: "",
    password: "",
  };

  const handleLogin = async (values: ILoginForm) => {
    setLoading(true);
    try {
      await login(values);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <div className="mb-5">
              <img alt="Logo" height={150} src="/logo_epayco.png" width={150} />
            </div>

            <div className="mb-6 w-full">
              <Input
                isRequired
                errorMessage={touched.email && errors.email}
                isInvalid={!!errors.email && !!touched.email}
                label="Email"
                name="email"
                type="text"
                value={values.email}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 w-full">
              <Input
                isRequired
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
                placeholder="Write your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            <Button
              className="text-white bg-green-300 hover:bg-green-400 focus:ring-4 focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              type="submit"
            >
              {loading ? <Spinner color="primary" /> : "Login"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
