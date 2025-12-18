import axios from "axios";
import type { VeicleData } from "../types/VeicleData";

const BITRIX_WEBHOOK_URL =
  "https://loma.bitrix24.com.br/rest/13/fjmtf3sgm16jyynl";

const sendData = async (data: VeicleData, cliente: string): Promise<void> => {
  try {
    await axios.post(`${BITRIX_WEBHOOK_URL}/crm.deal.add`, {
      fields: {
        TITLE: `Cotação | ${cliente}`,
        UF_CRM_CLIENTE: cliente,
        UF_CRM_COD_FIPE: data.codeFipe,
        UF_CRM_FIPE_VALOR: data.price,
        UF_CRM_VEIC_TIPO: data.vehicleType,
        UF_CRM_VEIC_MARCA: data.brand,
        UF_CRM_VEIC_MODELO: data.model,
        UF_CRM_VEIC_ANO: data.modelYear,
        UF_CRM_FIPE_REF: data.referenceMonth,
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
