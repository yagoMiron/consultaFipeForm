import { useEffect, useState } from "react";
import { useMask } from "@react-input/mask";
import styles from "./styles.module.css";
import "./App.css";
import SelectInput from "./components/SelectInput";
import getMarca from "./services/getMarca";
import getModelo from "./services/getModelo";
import getAno from "./services/getAno";
import getFipe from "./services/getFipe";
import "react-responsive-modal/styles.css";
import CustomModal from "./components/CustomModal";
import faceError from "./assets/face-id-error.svg";

function App() {
  const [open, setOpen] = useState(false);
  const [placa, setPlaca] = useState("");
  const [semPlaca, setSemPlaca] = useState(false);
  const [tipo, setTipo] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [listaMarcas, setListaMarcas] = useState<
    { code: string; name: string }[]
  >([]);
  const [modelo, setModelo] = useState<string>("");
  const [listaModelos, setListaModelos] = useState<
    { code: string; name: string }[]
  >([]);
  const [ano, setAno] = useState<string>("");
  const [listaAnos, setListaAnos] = useState<{ code: string; name: string }[]>(
    []
  );
  const [veicleData, setVeicleData] = useState({
    codeFipe: "",
    price: "",
    referenceMonth: "",
    vehicleType: 1,
    brand: "",
    model: "",
    modelYear: 0,
    fuel: "",
    fuelAcronym: "",
  });

  const nomeDoVeiculo = (codigo: number) => {
    switch (codigo) {
      case 1:
        return "Carro";
      case 2:
        return "Moto";
      case 3:
        return "Caminhão";
      default:
        return "";
    }
  };
  useEffect(() => {
    if (!semPlaca || !tipo) {
      return;
    }
    getMarca(tipo).then((value) => {
      setListaMarcas(value);
    });
  }, [tipo]);

  useEffect(() => {
    if (!semPlaca || !tipo || !marca) {
      return;
    }
    getModelo(tipo, marca).then((value) => {
      setListaModelos(value);
    });
  }, [marca]);
  useEffect(() => {
    if (!semPlaca || !tipo || !marca || !modelo) {
      return;
    }
    getAno(tipo, marca, modelo).then((value) => {
      setListaAnos(value);
    });
  }, [modelo]);

  return (
    <>
      <form className={styles.form}>
        <h2>Consulta Tabela Fipe</h2>

        <div
          className={`${styles.inputBox} ${
            semPlaca ? styles.fadeOut : styles.fadeIn
          }`}
        >
          <label htmlFor="placa">Placa:</label>
          <input
            type="text"
            className={styles.texto}
            value={placa}
            onChange={(e) => {
              setPlaca(e.target.value.toUpperCase());
            }}
            name="placa"
            ref={useMask({
              mask: "LLL-NLNN",
              replacement: { L: /[a-zA-Z]/, N: /\d/ },
            })}
            placeholder="AAA-0A00"
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="sem-placa"
            checked={semPlaca}
            onChange={(e) => {
              setSemPlaca(e.target.checked);
            }}
          />
          <span>Não possuo a placa</span>
        </div>

        <SelectInput
          title="Tipo"
          value={tipo}
          setter={setTipo}
          hidden={!semPlaca}
        >
          <option value="">-</option>
          <option value="motorcycles">Motos</option>
          <option value="cars">Carros</option>
          <option value="trucks">Caminhão</option>
        </SelectInput>

        <SelectInput
          title="Marca"
          value={marca}
          setter={setMarca}
          hidden={!semPlaca || !Boolean(tipo)}
        >
          <option value="">-</option>
          {listaMarcas.map((value, index) => (
            <option value={value.code} key={index}>
              {value.name}
            </option>
          ))}
        </SelectInput>

        <SelectInput
          title="Modelo"
          value={modelo}
          setter={setModelo}
          hidden={!Boolean(marca) || !Boolean(tipo) || !semPlaca}
        >
          <option value="">-</option>
          {listaModelos.map((value, index) => (
            <option value={value.code} key={index}>
              {value.name}
            </option>
          ))}
        </SelectInput>

        <SelectInput
          title="Ano"
          value={ano}
          setter={setAno}
          hidden={
            !Boolean(modelo) || !Boolean(marca) || !Boolean(tipo) || !semPlaca
          }
        >
          <option value="">-</option>
          {listaAnos.map((value, index) => (
            <option value={value.code} key={index}>
              {value.name}
            </option>
          ))}
        </SelectInput>

        <hr className={styles.separador} />

        <button
          className={styles.search_btn}
          disabled={
            !(
              (semPlaca && tipo && marca && modelo && ano) ||
              (!semPlaca && placa.length > 7)
            )
          }
          onClick={(e) => {
            e.preventDefault();
            if (semPlaca) {
              getFipe(tipo, marca, modelo, ano)
                .then((detalhes) => {
                  setVeicleData(detalhes);
                  setOpen(true);
                  console.log(veicleData);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              setOpen(true);
            }
          }}
        >
          Buscar
        </button>
      </form>
      <CustomModal show={open} setShow={setOpen} title="Detalhes">
        <>
          {semPlaca ? (
            <>
              <div className={styles.block}>
                <p>
                  <strong>Código FIPE:</strong>
                  {` ${veicleData.codeFipe}`}
                </p>
                <p>
                  <strong>Preço médio:</strong> {` ${veicleData.price}`}
                </p>
                <p>
                  <strong>Mês de Referencia:</strong>
                  {` ${veicleData.referenceMonth}`}
                </p>
              </div>
              <div className={styles.block}>
                <p>
                  <strong>Tipo de veículo:</strong>
                  {` ${nomeDoVeiculo(veicleData.vehicleType)}`}
                </p>
                <p>
                  <strong>Marca:</strong>
                  {` ${veicleData.brand}`}
                </p>
                <p>
                  <strong>Modelo:</strong>
                  {` ${veicleData.model}`}
                </p>
                <p>
                  <strong>Ano:</strong>
                  {` ${veicleData.modelYear}`}
                </p>
                <p>
                  <strong>Combustivel:</strong>
                  {` ${veicleData.fuel}`}
                </p>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: 40,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto",
                  width: 200,
                  textAlign: "center",
                }}
              >
                <img
                  src={faceError}
                  alt="Erro"
                  style={{
                    height: 200,
                  }}
                />
                <span>
                  <strong>ERRO:</strong> Esse recurso ainda não está disponivel
                </span>
              </div>
            </div>
          )}
        </>
      </CustomModal>
    </>
  );
}

export default App;
