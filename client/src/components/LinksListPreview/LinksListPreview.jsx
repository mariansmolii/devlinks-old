import { useEffect, useState } from "react";

import Icon from "../Icon/Icon";
import useLinks from "../../hooks/useLinks";
import styles from "./LinksListPreview.module.scss";

const LinksListPreview = () => {
  const { links } = useLinks();

  const [sortedLinks, setSortedLinks] = useState([]);

  useEffect(() => {
    const sortedLinks = [...links].sort((a, b) => a.index - b.index);

    setSortedLinks(sortedLinks);
  }, [links]);

  return (
    <ul className={styles.list}>
      {sortedLinks &&
        sortedLinks.slice(0, 5).map(({ _id, platform, url }) => (
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
        ))}
    </ul>
  );
};

export default LinksListPreview;
