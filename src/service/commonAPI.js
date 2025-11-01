// src/service/commonAPI.js
import axios from "axios";

export const commonAPI = async (method, url, data) => {
  const config = {
    method,
    url,
    data,
  };
  return await axios(config);
};