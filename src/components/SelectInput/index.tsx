import type { ReactElement } from "react";
import styles from "./styles.module.css";

type Props = {
  title: string;
  value: string;
  setter?: React.Dispatch<React.SetStateAction<string>>;
  hidden: boolean;
  children: ReactElement;
};

const SelectInput = ({ title, value, setter, hidden, children }: Props) => {
  return (
    <div
      className={`${styles.campo} ${hidden ? styles.fadeOut : styles.fadeIn}`}
    >
      <label className={styles.title}>{title}:</label>
      <select
        value={value}
        onChange={
          setter &&
          ((e) => {
            const v = e.target.value;
            setter(v);
            e.currentTarget.setCustomValidity("");
          })
        }
      >
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
