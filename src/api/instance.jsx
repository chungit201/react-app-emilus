import axios from "axios";
const token = JSON.parse(sessionStorage.getItem("access_token"))
const instance = axios.create({
  baseURL:"https://server-my-app-0012.herokuapp.com/api",
  headers: {
    'Content-Type': "application/json",
    'Authorization': 'Bearer ' + token
  }
})

export default instance;