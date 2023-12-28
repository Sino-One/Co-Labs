import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    withCredentials: true,
  },
};

export const get = async (url) => {
  try {
    const data = await axios.get("http://localhost:5000/" + url, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const post = async (url, body) => {
  try {
    const data = await axios.post("http://localhost:5000/" + url, body, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};
