import axios from "axios";
const token = JSON.parse(sessionStorage.getItem("access_token"))
const instance = axios.create({
  baseURL:"http://localhost:4000/api",
  headers: {
    'Content-Type': "application/json",
    'Authorization': 'Bearer ' + token
  }
})

export default instance;