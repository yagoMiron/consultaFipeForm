import axios from "axios";

const API_URL = "https://fipe.parallelum.com.br/api/v2";

const getFipe = async (
  tipo: string,
  marca: string,
  modelo: string,
  ano: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/${tipo}/brands/${marca}/models/${modelo}/years/${ano}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getFipe;
