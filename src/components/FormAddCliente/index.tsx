import { useState } from "react";
import CustomModal from "../CustomModal";
import styles from "./styles.module.css";
import addCliente from "../../assets/addCliente_azul.svg";
import postCliente from "../../services/postCliente";
import { useSearchParams } from "react-router-dom";
import type { Cliente } from "../../types/Cliente";
import { useMask } from "@react-input/mask";
import { phoneMask } from "../../controller/Masks";

type Props = {
  show: boolean;
  setShow: (value: React.SetStateAction<boolean>) => void;
  addClient: (novoCliente: Cliente) => void;
  setIdCliente: (value: React.SetStateAction<string>) => void;
};

const FormAddCliente = ({ show, setShow, addClient, setIdCliente }: Props) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  return (
    <CustomModal
      setShow={setShow}
      show={show}
      title="Criar novo Contato de Cliente"
      logo={addCliente}
    >
      <form action="" className={styles.form}>
        <div className={styles.campos}>
          <div className={styles.nomesContainer}>
            <div className={styles.inputBox}>
              <label htmlFor="cliente">Nome: *</label>
              <input
                type="text"
                required
                className={styles.texto}
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                name="nome"
                placeholder="Nome"
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="cliente">Sobrenome:</label>
              <input
                type="text"
                className={styles.texto}
                value={sobreNome}
                onChange={(e) => {
                  setSobreNome(e.target.value);
                }}
                name="sobrenome"
                placeholder="Sobrenome"
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="cliente">Ultimo Nome:</label>
              <input
                type="text"
                className={styles.texto}
                value={ultimoNome}
                onChange={(e) => {
                  setUltimoNome(e.target.value);
                }}
                name="ultimoNome"
                placeholder="Ultimo Nome"
              />
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="cliente">Telefone:</label>
            <input
              ref={useMask(phoneMask)}
              type="text"
              className={styles.texto}
              value={telefone}
              onChange={(e) => {
                setTelefone(e.target.value);
              }}
              name="telefone"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="cliente">Email:</label>
            <input
              type="email"
              className={styles.texto}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              placeholder="seu@email.com"
            />
          </div>
        </div>
        <hr className={styles.separador} />
        <button
          className={`${styles.btn} ${styles.add_cliente_btn}`}
          disabled={!nome}
          onClick={(e) => {
            e.preventDefault();
            if (!userId || !token) {
              return;
            }
            postCliente(
              {
                NAME: nome,
                SECOND_NAME: sobreNome,
                LAST_NAME: ultimoNome,
                EMAIL: email,
                PHONE: telefone,
              },
              userId,
              token
            ).then((novoCliente) => {
              addClient(novoCliente);
              setIdCliente(novoCliente.ID);
              setShow(false);
            });
          }}
        >
          + Criar novo Cliente
        </button>
      </form>
    </CustomModal>
  );
};
export default FormAddCliente;
