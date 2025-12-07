import axios from "axios";

const API_URL = "https://fipe.parallelum.com.br/api/v2";

const getMarca = async (tipo: string) => {
  try {
    const response = await axios.get(`${API_URL}/${tipo}/brands`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getMarca;
