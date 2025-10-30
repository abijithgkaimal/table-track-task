import axios from "axios";

export const BASE_URL = "https://6903619fd0f10a340b23fbff.mockapi.io";

const api = axios.create({
  baseURL: `${BASE_URL}/data`, 
});

export default api;
