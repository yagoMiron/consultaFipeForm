import { useState } from "react";
import CustomModal from "../CustomModal";
import styles from "./styles.module.css";
import addCliente from "../../assets/addCliente_azul.svg";
import postCliente from "../../services/postCliente";
import { useSearchParams } from "react-router-dom";
import type { Cliente } from "../../types/Cliente";
import { useMask } from "@react-input/mask";
import { phoneMask } from "../../controller/Masks";
import TextInput from "../TextInput";

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
            <TextInput
              placeholder="Nome"
              setter={setNome}
              title="Nome: "
              value={nome}
              required
              nome="nome"
            />
            <TextInput
              nome="sobrenome"
              placeholder="Sobrenome"
              setter={setSobreNome}
              title="Sobrenome:"
              value={sobreNome}
            />
            <TextInput
              nome="ultimoNome"
              placeholder="Último Nome"
              setter={setUltimoNome}
              title="Último Nome:"
              value={ultimoNome}
            />
          </div>
          <TextInput
            nome="telefone"
            placeholder="(00) 00000-0000"
            setter={setTelefone}
            title="Telefone:"
            value={telefone}
            mask={useMask(phoneMask)}
          />
          <TextInput
            nome="email"
            placeholder="seu@email.com"
            setter={setEmail}
            title="Email:"
            value={email}
            type="email"
          />
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
