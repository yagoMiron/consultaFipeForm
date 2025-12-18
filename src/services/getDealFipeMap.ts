import axios from "axios";

type FieldMap = Record<string, string>;

type BitrixField = {
  TITLE?: string;
  LIST_LABEL?: string;
};

export async function getDealFieldMap(
  userId: string,
  token: string,
  domain = "loma.bitrix24.com.br"
): Promise<FieldMap> {
  const url = `https://${domain}/rest/${userId}/${token}/crm.deal.fields`;

  const response = await axios.get(url);
  const fields = response.data.result as Record<string, BitrixField>;

  // labels esperados → chave interna sua
  const labelMap: Record<string, string> = {
    Placa: "PLACA",
    "Código FIPE": "COD_FIPE",
    Marca: "MARCA",
    Modelo: "MODELO",
    Ano: "ANO",
    "Valor FIPE": "VALOR_FIPE",
    "Referência FIPE": "REF_FIPE",
    Cliente: "CLIENTE",
    "Tipo do Veículo": "TIPO_VEIC",
  };

  const fieldMap: FieldMap = {};

  for (const [fieldCode, fieldData] of Object.entries(fields)) {
    const label = fieldData.TITLE || fieldData.LIST_LABEL;

    if (label && labelMap[label]) {
      fieldMap[labelMap[label]] = fieldCode;
    }
  }

  return fieldMap;
}
