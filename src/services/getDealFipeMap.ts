import axios from "axios";
import type { CampoBitrix } from "../types/CampoBitrix";
import type { DealFieldMap } from "../types/DealFieldMap";
import { LABEL_TO_KEY } from "../constants/LABEL_TO_KEY";

function fieldsObjectToArray(
  fields: Record<string, CampoBitrix>
): CampoBitrix[] {
  return Object.values(fields);
}

export async function getDealFieldMap(
  userId: string,
  token: string,
  domain = "loma.bitrix24.com.br"
): Promise<DealFieldMap> {
  const url = `https://${domain}/rest/${userId}/${token}/crm.deal.fields`;

  const response = await axios.get(url);
  const fieldsObject = response.data.result as Record<string, CampoBitrix>;
  const fieldsArray = fieldsObjectToArray(fieldsObject);

  const fieldMap = {} as DealFieldMap;

  for (const campo of fieldsArray) {
    const key = LABEL_TO_KEY[campo.formLabel];
    if (key) {
      fieldMap[key] = campo.title;
    }
  }

  // 🔒 validação forte (opcional, mas recomendada)
  const missingFields = Object.values(LABEL_TO_KEY).filter(
    (key) => !fieldMap[key]
  );

  if (missingFields.length > 0) {
    console.log(
      `Campos ausentes no Bitrix: ${missingFields.join(", ")}`
    );
  }

  return fieldMap;
}
