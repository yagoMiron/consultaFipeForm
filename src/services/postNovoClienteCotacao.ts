import axios from "axios";
import type { VeicleData } from "../types/VeicleData";
import sendData from "./sendData";

const postNovoClienteCotacao = async (
  data: VeicleData,
  nomeCliente: string,
  userId: string,
  token: string,
  domain = "loma.bitrix24.com.br"
) => {
  const novoContato = await axios.post(
    `https://${domain}/rest/${userId}/${token}/crm.contact.add`,
    {
      fields: {
        NAME: nomeCliente,
        SOURCE_ID: "WEB",
      },
    }
  );
  const idContato = `${Number(novoContato.data.result)}`;
  sendData(data, idContato, userId, token);
};

export default postNovoClienteCotacao;
