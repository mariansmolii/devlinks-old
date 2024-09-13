import getLinkSheme from "../schemas/linkScheme";

const validateLinkInput = (value, platform) => {
  const pattern = new RegExp(getLinkSheme(platform));
  const isEmpty = value.trim() === "";
  const isError = !pattern.test(value) && !isEmpty;
  const message = isEmpty
    ? "Can't be empty"
    : isError
    ? "Invalid URL format"
    : "";

  return { isError: isEmpty || isError, message };
};

export default validateLinkInput;
