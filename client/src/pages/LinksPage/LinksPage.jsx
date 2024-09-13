import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createLink, updateLinks } from "../../store/links/linksOperations";
import { addLink, getLinkData } from "../../store/links/linksSlice";

import toast from "react-hot-toast";
import useLinks from "../../hooks/useLinks";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import PageTitle from "../../components/PageTitle/PageTitle";
import LinksList from "../../components/LinksList/LinksList";
import CustomToast from "../../components/CustomToast/CustomToast";
import LinkInstruction from "../../components/LinkInstruction/LinkInstruction";
import options from "../../utils/data/selectData";
import styles from "./LinksPage.module.scss";

const LinksPage = () => {
  const dispatch = useDispatch();
  const { links } = useLinks();

  const [allLinks, setAllLinks] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(options[0]);
  const [errors, setErrors] = useState({});
  const [inputValues, setInputValues] = useState({});

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
  const isEmptyValues = Object.values(inputValues).some(
    (value) => value === ""
  );

  const handleSave = async () => {
    const noNewLink = allLinks.filter((link) => link.type !== "new");
    const isNewLink = allLinks.some((link) => link.type === "new");

    if (hasErrors || isEmptyValues) return;

    try {
      if (isNewLink) {
        await dispatch(createLink(allLinks));
      }

      await dispatch(updateLinks(noNewLink));

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
            inputValues={inputValues}
            setInputValues={setInputValues}
            isEmptyValues={isEmptyValues}
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
          disabled={allLinks.length === 0 || hasErrors || isEmptyValues}
          onClick={handleSave}
        />
      </div>
    </Section>
  );
};

export default LinksPage;
