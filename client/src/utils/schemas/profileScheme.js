import * as Yup from "yup";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const profileValidationScheme = Yup.object().shape({
  firstName: Yup.string().trim().required("Can't be empty"),
  lastName: Yup.string().trim().required("Can't be empty"),
  emailPreview: Yup.string().matches(emailRegexp, "Invalid email"),
});

export default profileValidationScheme;
