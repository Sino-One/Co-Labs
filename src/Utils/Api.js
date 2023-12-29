import axios from "axios";

const config = {
  withCredentials: true,
};

export const get = async (url) => {
  try {
    const data = await axios.get("http://localhost:5000/" + url, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const post = async (url, body) => {
  try {
    const data = await axios.post("http://localhost:5000/" + url, body, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
