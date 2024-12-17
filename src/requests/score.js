import apiClient from "./init";

export const postScore = async (data) => {
  const response = await apiClient
    .post("/score/result/", data)
    .then((response) => console.log(response))
    .catch((error) => alert("Error when posting score!"));

  console.log("🚀 post score request response: ", response);
};

export const getScores = async (data) => {
  const response = await apiClient
    .get("/score/result/", data)
    .then((response) => console.log(response))
    .catch((error) => alert("Error when getting scores!"));

  console.log("🚀 get scores request response: ", response);
};
