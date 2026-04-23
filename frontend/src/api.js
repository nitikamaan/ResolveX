import axios from "axios";

const API = axios.create({
  baseURL: "https://resolvex-hiyn.onrender.com"
});

export default API;