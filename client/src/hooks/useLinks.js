import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectLinksError,
  selectLinks,
  selectIsLinksInDB,
} from "../store/links/linksSelectors";

const useLinks = () => {
  const links = useSelector(selectLinks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectLinksError);
  const isLinksInDB = useSelector(selectIsLinksInDB);

  return { links, isLoading, error, isLinksInDB };
};

export default useLinks;
