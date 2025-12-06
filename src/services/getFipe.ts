import axios from "axios";

const API_URL = "http://localhost:3000";

const getFipe = async (
  tipo: string,
  marca: string,
  modelo: string,
  ano: string
) => {
  const response = await axios.get(
    `${API_URL}/sem-placa/detalhes/${tipo}/${marca}/${modelo}/${ano}`
  );
  return response.data;
};

export default getFipe;
