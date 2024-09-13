const filterLinkFields = (link) => {
  const { platform, url, index } = link;
  return { platform, url, index };
};

export default filterLinkFields;
