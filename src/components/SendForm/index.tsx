import { useEffect, useState } from "react";
import type { VeicleData } from "../../types/VeicleData";
import styles from "./styles.module.css";
import sendData from "../../services/sendData";
import success from "../../assets/success.svg";
import { useSearchParams } from "react-router-dom";
import getContactMap from "../../services/getContactMap";
import SelectInput from "../SelectInput";
import CheckBoxInput from "../CheckBoxInput";
import postNovoClienteCotacao from "../../services/postNovoClienteCotacao";

type Props = {
  veicleData: VeicleData;
};

type Cliente = {
  ID: string;
  NOME: string;
};

const SendForm = ({ veicleData }: Props) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const [deuError, setDeuError] = useState(false);
  const [activeContainer, setActiveContainer] = useState(1);
  const [nomeCliente, setNomeCliente] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [listaClientes, setListaClientes] = useState<Cliente[]>([]);
  const [ehNovoCliente, setEhNovoCliente] = useState(false);
  useEffect(() => {
    if (userId && token) {
      getContactMap(userId, token).then((clientes) => {
        setListaClientes(clientes);
      });
    } else {
      setDeuError(true);
      console.log("Id do usuário ou token não encontrado");
    }
  }, [userId, token]);

  return (
    <form className={styles.form}>
      <div
        className={`${styles.container} ${
          activeContainer !== 1 && styles.hidden
        }`}
      >
        <h2>Enviar dados para o Bitrix</h2>
        <SelectInput
          title="Selecione um Cliente"
          setter={setIdCliente}
          value={idCliente}
          hidden={ehNovoCliente}
        >
          <>
            <option value="">-</option>
            {listaClientes.map((value, index) => (
              <option value={value.ID} key={index}>
                {value.NOME}
              </option>
            ))}
          </>
        </SelectInput>
        <CheckBoxInput
          name="novo-cliente"
          checked={ehNovoCliente}
          setter={setEhNovoCliente}
          text="Criar novo cliente"
        />
        <div
          className={`${styles.inputBox} ${
            !ehNovoCliente ? styles.hidden : ""
          }`}
        >
          <label htmlFor="cliente">Nome do Cliente:</label>
          <input
            type="text"
            className={styles.texto}
            value={nomeCliente}
            onChange={(e) => {
              setNomeCliente(e.target.value);
            }}
            name="cliente"
            placeholder="Cliente"
          />
        </div>
        <span className={styles.errorMessage} hidden={!deuError}>
          Opa, acesse o link da aplicação via dashboard bitrix ou inclua o ID de
          usuário e token na URL
        </span>
        <hr className={styles.separador} />
        <button
          className={`${styles.btn} ${styles.send_btn}`}
          disabled={
            !(
              ((idCliente && !ehNovoCliente) ||
                (nomeCliente && ehNovoCliente)) &&
              veicleData.codeFipe &&
              !deuError
            )
          }
          onClick={(e) => {
            e.preventDefault();
            if (!userId || !token) {
              return;
            }
            if (idCliente && !ehNovoCliente) {
              sendData(veicleData, idCliente, userId, token);
            }
            if (nomeCliente && ehNovoCliente) {
              postNovoClienteCotacao(veicleData, nomeCliente, userId, token);
            }
            setActiveContainer(2);
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
