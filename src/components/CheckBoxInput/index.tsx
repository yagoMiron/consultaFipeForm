import styles from "./styles.module.css";

type Props = {
  name: string;
  text: string;
  checked: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckBoxInput = ({ name, text, checked, setter }: Props) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => {
          setter(e.target.checked);
        }}
      />
      <span>{text}</span>
    </div>
  );
};
export default CheckBoxInput;
