import styles from "./styles.module.css";
import type { VeicleData } from "../../types/VeicleData";
type Props = {
  veicleData: VeicleData;
  covered?: boolean;
  setActualPage: React.Dispatch<React.SetStateAction<number>>;
};

const ResultTable = ({ veicleData, covered, setActualPage }: Props) => {
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
  const rows = [
    { label: "Código FIPE", value: veicleData.codeFipe },
    { label: "Preço", value: veicleData.price },
    { label: "Tipo de veículo", value: nomeDoVeiculo(veicleData.vehicleType) },
    { label: "Marca", value: veicleData.brand },
    { label: "Modelo", value: veicleData.model },
    { label: "Ano do modelo", value: veicleData.modelYear },
    { label: "Combustível", value: veicleData.fuel },
    { label: "Mês de referência", value: veicleData.referenceMonth },
  ];
  return (
    <div className={`${styles.container} ${covered && styles.hidden}`}>
      <div className={styles.header}>
        <button
          className={styles.btn}
          onClick={() => {
            setActualPage(1);
          }}
        ></button>
        <h2>Dados do Veículo:</h2>
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={
                  index % 2 === 0 ? styles.rowWhite : styles.rowColored
                }
              >
                <td className={styles.label}>{row.label}</td>
                <td className={styles.value}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
