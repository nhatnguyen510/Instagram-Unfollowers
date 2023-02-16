import axios from "axios";

export const loginUser = async (username, password) => {
  const { data } = await axios.post("http://localhost:5000/api/v1/login", {
    username,
    password,
  });

  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post("http://localhost:5000/api/v1/logout");

  return data;
};

// export const fetchEncryptedUser = async (user) => {
//   const { data } = await axios.post("http://localhost:5000/api/v1/encrypt", {
//     user,
//   });

//   return data;
// };

// export const fetchDecryptedUser = async (encryptedUser) => {
//   const { data } = await axios.post("http://localhost:5000/api/v1/decrypt", {
//     encryptedUser,
//   });

//   return data;
// };
