import axios from "axios";

const API_URL = "http://localhost:3000";

const getAno = async (tipo: string, marca: string, modelo: string) => {
  const response = await axios.get(
    `${API_URL}/sem-placa/anos/${tipo}/${marca}/${modelo}`
  );
  return response.data;
};

export default getAno;
