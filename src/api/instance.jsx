import axios from "axios";
const token = JSON.parse(sessionStorage.getItem("access_token"))
const instance = axios.create({
  baseURL:"https://bb-assignment-react-01.herokuapp.com/api",
  headers: {
    'Content-Type': "application/json",
    'Authorization': 'Bearer ' + token
  }
})

export default instance;