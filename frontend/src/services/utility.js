import axios from "axios";

const utility = axios.create({
  baseURL:
    "http://localhost:8080/api/",

  headers: {

    "Content-Type":
      "application/json",
  },
});

// REQUEST INTERCEPTOR
utility.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(
      error
    );
  }
);

export default utility;