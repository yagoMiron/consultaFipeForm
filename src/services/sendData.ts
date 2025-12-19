import axios, { isAxiosError } from "axios";
import type { VeicleData } from "../types/VeicleData";
import { NomeVeiculo } from "../enum/NomeVeiculo";
import { getDealFieldMap } from "./getDealFipeMap";

const sendData = async (
  data: VeicleData,
  cliente: string,
  userId: string,
  token: string,
  domain = "loma.bitrix24.com.br"
): Promise<void> => {
  const fieldMap = await getDealFieldMap(userId, token);
  try {
    await axios.post(`https://${domain}/rest/${userId}/${token}/crm.deal.add`, {
      fields: {
        TITLE: `Cotação | ${cliente}`,
        [fieldMap.CLIENTE]: cliente,
        [fieldMap.FIPE_VALOR]: data.price,
        [fieldMap.COD_FIPE]: data.codeFipe,
        [fieldMap.VEIC_TIPO]: `${NomeVeiculo[data.vehicleType]}`,
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
