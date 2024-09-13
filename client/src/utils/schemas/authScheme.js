import * as Yup from "yup";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginValidationScheme = Yup.object({
  email: Yup.string()
    .matches(emailRegexp, "Invalid email address")
    .required("Can't be empty"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Can't be empty"),
});

export const registerValidationScheme = Yup.object({
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

const authScheme = {
  loginValidationScheme,
  registerValidationScheme,
};

export default authScheme;
