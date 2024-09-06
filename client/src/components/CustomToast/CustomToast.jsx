import Icon from "../Icon/Icon";
import styles from "./CustomToast.module.scss";

const CustomToast = (t) => {
  return (
    <div className={styles.toast}>
      <div>
        <Icon iconName={t.icon} w={20} />
        <p>{t.text}</p>
      </div>
    </div>
  );
};

export default CustomToast;
