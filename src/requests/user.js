import axios from "axios";
import apiClient from "./init";

export const register = async (data) => {
  const response = await axios.post("/register/", data);
  console.log("🚀 register request response: ", response);
  if (response && response.status === 201) {
    alert("Successfully registered!");
  } else {
    alert("Error when register!");
  }
};

export const login = async (data, callback) => {
  const response = await axios.post("/login/", data);
  console.log("🚀 login request response: ", response);
  if (response && response.status === 200) {
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    callback(response.data);
  } else {
    alert("Error when login!");
  }
};

export const logout = async (data, callback) => {
  const response = await apiClient
    .post("/logout/", data)
    .then((response) => localStorage.clear(), callback(null))
    .catch((error) => alert("Error when logout!"));

  console.log("🚀 Logout request response: ", response);
};
