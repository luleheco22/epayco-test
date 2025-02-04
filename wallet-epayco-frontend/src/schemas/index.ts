import { object, ref, string, number } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format",
    ),
  password: string()
    .required("Password is requered")
    .matches(/[A-Z]/, "The password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

export const RegisterSchema = object().shape({
  name: string()
    .required("Name is required")
    .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces"),
  document: string()
    .required("Document is required")
    .matches(/^\d+$/, "Document must be a valid number")
    .matches(
      /^[1-9]\d*$/,
      "Document must be a valid number and cannot start with zero",
    ),
  phone: string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format"),
  email: string().required("Email is required").email("Invalid email format"),
  password: string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
});

export const RechargeWalletSchema = object().shape({
  document: string()
    .required("Document is required")
    .matches(/^\d+$/, "Document must be a valid number")
    .matches(
      /^[1-9]\d*$/,
      "Document must be a valid number and cannot start with zero",
    ),
  phone: string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format"),
  balance: number()
    .required("Balance is required")
    .positive("Balance must be greater than 0")
    .integer("Balance must be integer"),
});

export const PaySchema = object().shape({
  document: string()
    .required("Document is required")
    .matches(/^\d+$/, "Document must be a valid number")
    .matches(
      /^[1-9]\d*$/,
      "Document must be a valid number and cannot start with zero",
    ),
  amount: number()
    .required("Amount is required")
    .positive("Amount must be greater than 0")
    .integer("Amount must be integer"),
});
