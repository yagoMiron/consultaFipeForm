import { useState } from "react";
import type { VeicleData } from "../../types/VeicleData";
import styles from "./styles.module.css";
import sendData from "../../services/sendData";
import success from "../../assets/success.svg";

type Props = {
  veicleData: VeicleData;
};

const SendForm = ({ veicleData }: Props) => {
  const [activeContainer, setActiveContainer] = useState(1);
  const [cliente, setCliente] = useState("");
  return (
    <form className={styles.form}>
      <div
        className={`${styles.container} ${
          activeContainer !== 1 && styles.hidden
        }`}
      >
        <h2>Enviar dados para o Bitrix</h2>
        <div className={styles.inputBox}>
          <label htmlFor="cliente">Nome do Cliente:</label>
          <input
            type="text"
            className={styles.texto}
            value={cliente}
            onChange={(e) => {
              setCliente(e.target.value);
            }}
            name="cliente"
            placeholder="Cliente"
          />
        </div>
        <hr className={styles.separador} />
        <button
          className={`${styles.btn} ${styles.send_btn}`}
          disabled={!(cliente && veicleData.codeFipe)}
          onClick={(e) => {
            e.preventDefault();
            if (cliente) {
              sendData(veicleData, cliente);
              setActiveContainer(2);
            }
          }}
        >
          Enviar Dados
        </button>
      </div>
      <div
        className={`${styles.container} ${
          activeContainer !== 2 && styles.hidden
        }`}
      >
        <div className={styles.feedbackBox}>
          <img className={styles.success} src={success} alt="Sucesso" />
          <span>Dado Enviado com Sucesso!</span>
          <hr className={styles.separador} />
          <button
            className={`${styles.btn} ${styles.return_btn}`}
            disabled={!(cliente && veicleData.codeFipe)}
            onClick={(e) => {
              e.preventDefault();
              setActiveContainer(1);
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </form>
  );
};
export default SendForm;
