import { useSelector } from "react-redux";
import {
  selectEmailPreview,
  selectFirstName,
  selectImage,
  selectImagePreview,
  selectLastName,
  selectProfileError,
  selectProfileIsLoading,
} from "../store/profile/profileSelectors";

const useProfile = () => {
  const image = useSelector(selectImage);
  const imagePreview = useSelector(selectImagePreview);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const emailPreview = useSelector(selectEmailPreview);
  const error = useSelector(selectProfileError);
  const isLoading = useSelector(selectProfileIsLoading);
  const fullName = `${firstName} ${lastName}`;

  return {
    image,
    firstName,
    lastName,
    emailPreview,
    error,
    isLoading,
    fullName,
    imagePreview,
  };
};

export default useProfile;
