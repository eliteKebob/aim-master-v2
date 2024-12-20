import apiClient from "./init";

export const postScore = async (data, callback = null) => {
  const response = await apiClient
    .post("/score/result/", data)
    .then((response) => {
      console.log("🚀 post score request response: ", response);
      if (response.status === 200) {
        callback && callback();
      }
    })
    .catch((error) => alert("Error when posting score!"));
};

export const getScores = async (data = null, callback = null) => {
  const response = await apiClient
    .get("/score/result/", data)
    .then((response) => {
      if (response.status === 200) {
        callback(response.data.data);
      }
    })
    .catch((error) => alert("Error when getting scores!"));

  console.log("🚀 get scores request response: ", response);
};
