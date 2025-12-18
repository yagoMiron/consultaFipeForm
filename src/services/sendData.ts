import axios, { isAxiosError } from "axios";
import type { VeicleData } from "../types/VeicleData";
import { NomeVeiculo } from "../enum/NomeVeiculo";
import { getDealFieldMap } from "./getDealFipeMap";

const BITRIX_WEBHOOK_URL =
  "https://loma.bitrix24.com.br/rest/13/fjmtf3sgm16jyynl";

const sendData = async (
  data: VeicleData,
  cliente: string,
  userId: string,
  token: string
): Promise<void> => {
  const fieldMap = await getDealFieldMap(userId, token);
  try {
    await axios.post(`${BITRIX_WEBHOOK_URL}/crm.deal.add`, {
      fields: {
        TITLE: `Cotação | ${cliente}`,
        [fieldMap.CLIENTE]: cliente,
        [fieldMap.FIPE_VALOR]: data.price,
        [fieldMap.COD_FIPE]: data.codeFipe,
        [fieldMap.VEIC_TIPO]: `${NomeVeiculo[data.vehicleType + 1]}`,
        [fieldMap.VEIC_MARCA]: data.brand,
        [fieldMap.VEIC_MODELO]: data.model,
        [fieldMap.VEIC_ANO]: data.modelYear,
        [fieldMap.FIPE_REF]: data.referenceMonth,
      },
    });
  } catch (error) {
    console.log("error ao enviar dados para o bitrix");

    if (!isAxiosError(error)) {
      return;
    }

    console.error(
      "Erro ao enviar dados para o Bitrix24:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export default sendData;
