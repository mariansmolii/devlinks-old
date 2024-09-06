import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectUserEmail,
} from "../store/auth/authSelectors";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const userEmail = useSelector(selectUserEmail);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isRefreshing = useSelector(selectIsRefreshing);

  return { isLoggedIn, token, userEmail, isLoading, error, isRefreshing };
};

export default useAuth;
