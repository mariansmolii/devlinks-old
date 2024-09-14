import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  updateProfileImage,
  updateProfileInfo,
} from "../../store/profile/profileOperations";
import {
  updateFullNameAndEmail,
  updateImage,
} from "../../store/profile/profileSlice";

import Input from "../Input/Input";
import Button from "../Button/Button";
import Uploader from "../Uploader/Uploader";
import BtnLoader from "../Loader/BtnLoader";
import useProfile from "../../hooks/useProfile";
import toast from "react-hot-toast";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import CustomToast from "../CustomToast/CustomToast";
import profileValidationSchema from "../../utils/schemas/profileScheme";
import useAuth from "../../hooks/useAuth";
import styles from "./ProfileForm.module.scss";

const ProfileForm = () => {
  const [imageFile, setImageFile] = useState(null);

  const {
    isLoading,
    firstName: userFirstName,
    lastName: userLastName,
    emailPreview: userEmailPreview,
  } = useProfile();
  const { userId } = useAuth();

  const dispatch = useDispatch();

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: userFirstName || "",
        lastName: userLastName || "",
        emailPreview: userEmailPreview || "",
      },
      enableReinitialize: true,
      validationSchema: profileValidationSchema,
      onSubmit: async ({ firstName, lastName, emailPreview }) => {
        const formData = new FormData();

        try {
          if (imageFile) {
            formData.append("imageURL", imageFile);

            await dispatch(updateProfileImage(formData)).unwrap();
          }

          if (firstName.trim() || lastName.trim()) {
            await dispatch(
              updateProfileInfo({
                firstName,
                lastName,
                emailPreview,
                id: userId,
              })
            ).unwrap();
          }

          toast.custom((t) => (
            <CustomToast
              t={t}
              text="Your changes have been successfully saved!"
              icon="icon-changes-saved"
            />
          ));
        } catch {
          toast.custom((t) => (
            <CustomToast
              t={t}
              icon="warning"
              text="Something went wrong, please try again later!"
            />
          ));
        }
      },
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    dispatch(updateFullNameAndEmail({ [name]: value }));

    handleChange(e);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const fileSize = (file.size / 1024 / 1024).toFixed(4);

    if (fileSize >= 5) {
      return toast.custom((t) => (
        <CustomToast
          t={t}
          text={"Image size must be less than 5 MB"}
          icon={"warning"}
        />
      ));
    }

    const imageUrl = URL.createObjectURL(file);

    dispatch(updateImage(imageUrl));
    setImageFile(file);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <ContentWrapper className={styles.wrapper}>
        <h2>Profile picture</h2>

        <Uploader handleImageChange={handleImageChange} />

        <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </ContentWrapper>

      <div>
        <ContentWrapper>
          <div className={styles.inputWrapper}>
            <Input
              id="firstName"
              label="First name*"
              value={values.firstName}
              placeholder={"e.g. John"}
              name="firstName"
              type="text"
              onChange={handleInputChange}
              onBlur={handleBlur}
              isError={touched.firstName && errors.firstName}
              className={styles.input}
              labelError={false}
              errors={errors}
            />
            {touched.firstName && errors.firstName ? (
              <div className={styles.error}>
                <p>{errors.firstName}</p>
              </div>
            ) : null}
          </div>

          <div className={styles.inputWrapper}>
            <Input
              id="lastName"
              label="Last name*"
              value={values.lastName}
              placeholder={"e.g. Appleseed"}
              name="lastName"
              type="text"
              onChange={handleInputChange}
              onBlur={handleBlur}
              isError={touched.lastName && errors.lastName}
              className={styles.input}
              labelError={false}
              errors={errors}
            />

            {touched.lastName && errors.lastName ? (
              <div className={styles.error}>
                <p>{errors.lastName}</p>
              </div>
            ) : null}
          </div>

          <div className={styles.inputWrapper}>
            <Input
              id="emailPreview"
              label="Email"
              placeholder={"e.g. email@example.com"}
              value={values.emailPreview}
              name="emailPreview"
              type="email"
              onChange={handleInputChange}
              onBlur={handleBlur}
              isError={touched.emailPreview && errors.emailPreview}
              errors={errors}
              className={styles.input}
              labelError={false}
            />

            {touched.emailPreview && errors.emailPreview ? (
              <div className={styles.error}>
                <p>{errors.emailPreview}</p>
              </div>
            ) : null}
          </div>
        </ContentWrapper>
      </div>

      <Button
        title={isLoading ? <BtnLoader /> : "Save"}
        disabled={isLoading}
        variant={"primary"}
        type="submit"
      />
    </form>
  );
};

export default ProfileForm;
