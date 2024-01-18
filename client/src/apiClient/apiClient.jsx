import axios from "axios";

// let authToken = localStorage.getItem("token")
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

//inerceptor
apiClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        let getRefreshToken = localStorage.getItem("refreshToken");

        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/refresh-token`,
          { refreshToken: JSON.parse(getRefreshToken) },
          {
            withCredentials: true,
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
          }
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(data.data.refreshToken)
        );
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );

        error.response.config.headers[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        return apiClient.request(originalRequest);
      } catch (err) {}
    }
    throw error;
  }
);

export default apiClient;
