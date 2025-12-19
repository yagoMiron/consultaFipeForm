import "react-responsive-modal/styles.css";
import styles from "./styles.module.css";
import car_tag from "../../assets/car-tag.svg";
import { useState } from "react";
import loma from "../../assets/loma-logo.png";
import FormFipe from "../../components/FormFipe";
import type { VeicleData } from "../../types/VeicleData";
import ResultTable from "../../components/ResultTable";
import ErrorMessage from "../../components/ErrorMessage";
import SendForm from "../../components/SendForm";

function Home() {
  const [actualPage, setActualPage] = useState(1);
  const [veicleData, setVeicleData] = useState<VeicleData>({
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
  return (
    <div className={`${styles.section} ${actualPage !== 2 && styles.gap_0}`}>
      <div className={styles.container}>
        <img src={car_tag} alt="carro fipe" className={styles.logo} />
        <div className={styles.wrapper}>
          <FormFipe
            setVeicleData={setVeicleData}
            covered={actualPage !== 1}
            setActualPage={setActualPage}
          />
          <ResultTable
            veicleData={veicleData}
            covered={actualPage !== 2}
            setActualPage={setActualPage}
          />
          <ErrorMessage
            setActualPage={setActualPage}
            covered={actualPage !== 3}
          />
        </div>
      </div>
      <div
        className={`${styles.container} ${actualPage !== 2 && styles.hidden}`}
      >
        <img src={loma} alt="loma logo" className={styles.logo} />
        <div className={styles.wrapper}>
          <SendForm veicleData={veicleData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
