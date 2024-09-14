import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authOperations";

import toast from "react-hot-toast";
import Input from "../Input/Input";
import authScheme from "../../utils/schemas/authScheme";
import Button from "../Button/Button";
import BtnLoader from "../Loader/BtnLoader";
import CustomToast from "../CustomToast/CustomToast";
import useAuth from "../../hooks/useAuth";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useAuth();

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authScheme.loginValidationScheme,
    onSubmit: async ({ email, password }) => {
      if (!email.trim() || !password.trim()) {
        return;
      }

      try {
        await dispatch(login({ email, password })).unwrap();

        resetForm();
      } catch (error) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            text={`${error?.response?.data?.message}!`}
            icon={"warning"}
          />
        ));
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <div>
        <Input
          id="loginEmail"
          label="Email address"
          placeholder="e.g. alex@email.com"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          iconName="icon-email"
          isError={touched.email && errors.email}
          errors={errors}
        />

        {touched.email && errors.email ? (
          <div className={styles.error}>
            <p>{errors.email}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Input
          id="loginPassword"
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          iconName="icon-password"
          isError={touched.password && errors.password}
          errors={errors}
        />
        {touched.password && errors.password ? (
          <div className={styles.error}>
            <p>{errors.password}</p>
          </div>
        ) : null}
      </div>

      <Button
        title={isLoading ? <BtnLoader /> : "Login"}
        disabled={isLoading}
        variant={"primary"}
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
