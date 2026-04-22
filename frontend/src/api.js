import axios from "axios";

const API = axios.create({
  baseURL: "https://campuskey-dxzq.onrender.com"
});

export default API;