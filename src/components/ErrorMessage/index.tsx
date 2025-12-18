import styles from "./styles.module.css";
import warning from "../../assets/warning.svg";

type Props = {
  covered?: boolean;
  setActualPage: React.Dispatch<React.SetStateAction<number>>;
};

const ErrorMessage = ({ covered, setActualPage }: Props) => {
  return (
    <div className={`${styles.container} ${covered && styles.hidden}`}>
      <div className={styles.header}>
        <button
          className={styles.btn}
          onClick={() => {
            setActualPage(1);
          }}
        ></button>
        <h2>Ops, essa função ainda não foi implementada</h2>
      </div>
      <img className={styles.warning} src={warning} alt="Aviso" />
      <span className={styles.warningDesc}>
        É necessário a API do Detran para concluir essa função
      </span>
    </div>
  );
};
export default ErrorMessage;
