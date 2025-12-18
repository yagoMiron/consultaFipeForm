import { useState } from "react";
import type { VeicleData } from "../../types/VeicleData";
import styles from "./styles.module.css";

type Props = {
  veicleData: VeicleData;
};

const SendForm = ({ veicleData }: Props) => {
  const [cliente, setCliente] = useState("");
  return (
    <form className={styles.form}>
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
        className={styles.send_btn}
        disabled={!(cliente && veicleData.codeFipe)}
        onClick={(e) => {
          e.preventDefault();
          if (cliente) {
            console.log(cliente);
          }
        }}
      >
        Buscar
      </button>
    </form>
  );
};
export default SendForm;
