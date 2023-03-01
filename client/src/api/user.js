import axios from "axios";

const SERVER_API = process.env.REACT_APP_API_URL;

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
