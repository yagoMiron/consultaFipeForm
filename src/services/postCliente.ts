import axios, { isAxiosError } from "axios";
import sendData from "./sendData";
import type { ContatoCliente } from "../types/ContatoCliente";

const postCliente = async (
  data: ContatoCliente,
  userId: string,
  token: string,
  domain = "loma.bitrix24.com.br"
) => {
  const novoContato = await axios.post(
    `https://${domain}/rest/${userId}/${token}/crm.contact.add`,
    {
      fields: {
        NAME: data.NAME,
        SECOND_NAME: data.SECOND_NAME,
        LAST_NAME: data.LAST_NAME,
        PHONE: [{ VALUE: data.PHONE, VALUE_TYPE: "MOBILE" }],
        EMAIL: [{ VALUE: data.EMAIL, VALUE_TYPE: "WORK" }],
        SOURCE_ID: "WEB",
      },
    }
  );
  console.log(novoContato.data);
  console.log(novoContato.data.result);

  const idContato = novoContato.data.result;

  return {
    ID: idContato,
    NOME: `${data.NAME}${data.SECOND_NAME ? " " + data.SECOND_NAME : ""}${
      data.LAST_NAME ? " " + data.LAST_NAME : ""
    }`,
  };
};

export default postCliente;
