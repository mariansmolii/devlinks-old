import * as Yup from "yup";

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const profileValidationScheme = Yup.object().shape({
  firstName: Yup.string().trim().required("Can't be empty"),
  lastName: Yup.string().trim().required("Can't be empty"),
  emailPreview: Yup.string().matches(emailRegex, "Invalid email address"),
});

export default profileValidationScheme;
