import styles from "./styles.module.css";

type Props = {
  title: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  nome: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  mask?: React.Ref<HTMLInputElement> | undefined;
};

const TextInput = ({
  title,
  setter,
  value,
  nome,
  placeholder,
  type = "text",
  required,
  mask,
}: Props) => {
  return (
    <div className={styles.inputBox}>
      <label htmlFor={nome}>{title}</label>
      <input
        type={type}
        ref={mask}
        required={required}
        className={styles.texto}
        value={value}
        onChange={(e) => {
          setter(e.target.value);
        }}
        name={nome}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
