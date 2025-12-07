import axios from "axios";

const API_URL = "https://fipe.parallelum.com.br/api/v2";

const getModelo = async (tipo: string, marca: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/${tipo}/brands/${marca}/models`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getModelo;
