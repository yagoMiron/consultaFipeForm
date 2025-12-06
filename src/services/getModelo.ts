import axios from "axios";

const API_URL = "http://localhost:3000";

const getModelo = async (tipo: string, marca: string) => {
  const response = await axios.get(
    `${API_URL}/sem-placa/modelos/${tipo}/${marca}`
  );
  return response.data;
};

export default getModelo;
