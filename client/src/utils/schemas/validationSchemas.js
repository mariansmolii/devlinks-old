import * as Yup from "yup";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegexp, "Invalid email address")
    .required("Can't be empty"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Can't be empty"),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegexp, "Invalid email address")
    .required("Can't be empty"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Can't be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Can't be empty"),
});

const authSchemes = {
  loginValidationSchema,
  registerValidationSchema,
};

export default authSchemes;
