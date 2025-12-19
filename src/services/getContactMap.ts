import axios from "axios";
import type { ContatoBitrix } from "../types/ContatoBitrix";

const getContactMap = async (
  userId: string,
  token: string,
  domain = "loma.bitrix24.com.br"
) => {
  const url = `https://${domain}/rest/${userId}/${token}/crm.contact.list`;
  const response = await axios.get(url);
  const result = response.data.result;
  const contactMap = result.map((contact: ContatoBitrix) => ({
    ID: contact.ID,
    NOME: `${contact.NAME}${
      contact.SECOND_NAME ? " " + contact.SECOND_NAME : ""
    }${contact.LAST_NAME ? " " + contact.LAST_NAME : ""}`,
  }));
  return contactMap;
};
export default getContactMap;
