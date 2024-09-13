import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  createLink,
  getAllLinks,
  updateLinks,
} from "../../store/links/linksOperations";
import { addLink, getLinkData } from "../../store/links/linksSlice";

import Button from "../../components/Button/Button";
import LinksList from "../../components/LinksList/LinksList";
import PageTitle from "../../components/PageTitle/PageTitle";
import Section from "../../components/Section/Section";
import styles from "./LinksPage.module.scss";
import LinkInstruction from "../../components/LinkInstruction/LinkInstruction";
import useLinks from "../../hooks/useLinks";
import options from "../../utils/data/selectData";

const LinksPage = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(options[0]);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { links } = useLinks();

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch]);

  useEffect(() => {
    const sortedLinks = [...links].sort((a, b) => a.index - b.index);

    setAllLinks(sortedLinks);
  }, [links]);

  const createNewLink = () => {
    const newLinkId = nanoid();
    const index = allLinks.length;

    setAllLinks([...allLinks, { _id: newLinkId, index }]);
    dispatch(
      addLink({ _id: newLinkId, platform: "", url: "", type: "new", index })
    );

    dispatch(getLinkData({ _id: newLinkId, platform: options[0] }));
  };

  const hasErrors = Object.values(errors).some((error) => error.isError);

  const handleSave = () => {
    const isNewLink = allLinks.some((link) => link.type === "new");
    const noNewLink = allLinks.filter((link) => link.type !== "new");

    if (hasErrors) return;

    if (isNewLink) {
      dispatch(createLink(allLinks));
    }

    dispatch(updateLinks(noNewLink));
  };

  return (
    <Section className={styles.section}>
      <PageTitle
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />

      <Button
        type="button"
        title="+ Add new link"
        variant="secondary"
        className={styles.btn}
        onClick={createNewLink}
      />

      {links.length > 0 ? (
        <div className={styles.linksWrapper}>
          <LinksList
            links={allLinks}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
      ) : (
        <LinkInstruction />
      )}

      <div className={styles.btnWrapper}>
        <Button
          type={"button"}
          title={"Save"}
          variant={"primary"}
          disabled={allLinks.length === 0 || hasErrors}
          onClick={handleSave}
        />
      </div>
    </Section>
  );
};

export default LinksPage;
