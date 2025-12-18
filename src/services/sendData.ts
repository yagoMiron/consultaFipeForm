import axios from "axios";
import type { VeicleData } from "../types/VeicleData";
import { Fields } from "../enum/Fields";
import { NomeVeiculo } from "../enum/NomeVeiculo";

const BITRIX_WEBHOOK_URL =
  "https://loma.bitrix24.com.br/rest/13/fjmtf3sgm16jyynl";

const sendData = async (data: VeicleData, cliente: string): Promise<void> => {
  try {
    await axios.post(`${BITRIX_WEBHOOK_URL}/crm.deal.add`, {
      fields: {
        TITLE: `Cotação | ${cliente}`,
        [Fields.CLIENTE]: cliente,
        [Fields.FIPE_VALOR]: data.price,
        [Fields.COD_FIPE]: data.codeFipe,
        [Fields.VEIC_TIPO]: `${NomeVeiculo[data.vehicleType+1]}` ,
        [Fields.VEIC_MARCA]: data.brand,
        [Fields.VEIC_MODELO]: data.model,
        [Fields.VEIC_ANO]: data.modelYear,
        [Fields.FIPE_REF]: data.referenceMonth,
      },
    });
  } catch (error: any) {
    console.log("error ao enviar dados para o bitrix");

    console.error(
      "Erro ao enviar dados para o Bitrix24:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export default sendData;
