import axios from "axios";

const secureApi = (contentType?: string, token?: string) => {
  const type = contentType || "application/json";

  const customAxios = axios.create({
    headers: {
      Accept: `${type}`,
      "Content-Type": `${type}`,
    },
  });
  return customAxios;
};

export default secureApi;
