// Importing Axios library for making HTTP requests
import axios from "axios";

// Connecting frontend and backend through Axios

// Retrieving access token from local storage
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;

// Creating an Axios instance with a base URL and default headers
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor to handle responses and refresh access token on 401 (Unauthorized) error
apiClient.interceptors.response.use(
  // Success case: return the config object
  (config) => {
    return config;
  },
  // Error case: handle 401 error and attempt to refresh the access token
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 and it's not a retry request
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        // Retrieve refresh token from local storage
        let getRefreshToken = localStorage.getItem("refreshToken");

        // Send a request to refresh the access token using the refresh token
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

        // Update local storage with new refresh and access tokens
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(data.data.refreshToken)
        );
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data.data.accessToken)
        );

        // Update headers for the original request and default Axios instances
        error.response.config.headers[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;

        // Retry the original request with the new access token
        return apiClient.request(originalRequest);
      } catch (err) {
        // Handle errors that may occur during the token refresh
      }
    }

    // Throw the original error if it doesn't meet the refresh criteria
    throw error;
  }
);

// Exporting the configured Axios instance for use in other parts of the application
export default apiClient;
