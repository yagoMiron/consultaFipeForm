import axios from "axios";

const API_URL = "http://localhost:3000";

const getMarca = async (tipo: string) => {
  const response = await axios.get(`${API_URL}/sem-placa/marcas/${tipo}`);
  return response.data;
};

export default getMarca;
