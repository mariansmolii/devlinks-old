import { useEffect, useState } from "react";

import clsx from "clsx";
import PropType from "prop-types";
import Icon from "../Icon/Icon";
import useLinks from "../../hooks/useLinks";
import styles from "./LinksListPreview.module.scss";

const LinksListPreview = ({ className, showAll = false }) => {
  const [sortedLinks, setSortedLinks] = useState([]);

  const { links } = useLinks();

  useEffect(() => {
    if (links.length === 0) {
      setSortedLinks([]);
      return;
    }

    const sortedLinks = [...links].sort((a, b) => a.index - b.index);
    setSortedLinks(sortedLinks);
  }, [links]);

  return (
    <ul className={clsx(styles.list, className)}>
      {sortedLinks &&
        (showAll ? sortedLinks : sortedLinks.slice(0, 5)).map(
          ({ _id, platform, url }) => (
            <li
              key={_id}
              className={styles.item}
              style={{ backgroundColor: platform?.color }}
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <div>
                  <Icon w={16} iconName={platform?.iconName} />
                  <p>{platform?.label}</p>
                </div>
                <Icon iconName="icon-arrow-right" w={16} />
              </a>
            </li>
          )
        )}
    </ul>
  );
};

export default LinksListPreview;

LinksListPreview.propTypes = {
  className: PropType.string,
  showAll: PropType.bool,
};
