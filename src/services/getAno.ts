import axios from "axios";

const API_URL = "https://fipe.parallelum.com.br/api/v2";

const getAno = async (tipo: string, marca: string, modelo: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/${tipo}/brands/${marca}/models/${modelo}/years`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAno;
