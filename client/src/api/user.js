import axios from "axios";

const SERVER_API = "http://localhost:5000/api/v1";

export const loginUser = async (username, password) => {
  const { data } = await axios.post(`${SERVER_API}/login`, {
    username,
    password,
  });

  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post(`${SERVER_API}/logout`);

  return data;
};

export const findUnfollowers = async () => {
  const { data: notFollowingYou } = await axios.get(
    `${SERVER_API}/unfollowers`
  );

  return notFollowingYou;
};

export const unfollowUsers = async (users) => {
  const { data: unfollowedUsers } = await axios.post(
    `${SERVER_API}/destroyUnfollowers`,
    {
      notFollowingYou: users,
    }
  );

  return unfollowedUsers;
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
