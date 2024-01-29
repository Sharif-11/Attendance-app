import axios from "axios";
import axiosInstance from "./axiosInstance";

export const postData = async (url, data, formData = false) => {
  try {
    const response = await axiosInstance.post(
      url,
      data,
      formData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return {
        message: "*Unexpected Status code",
        statusCode: 400,
        success: false,
      };
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      return {
        statusCode: 400,
        success: false,
        message: "*Request is cancelled",
      };
    } else if (error.response) {
      const { status, data } = error.response;
      if (status === 400 || status === 401) {
        return data;
      } else if (status === 404) {
        return {
          message: "*Resource not found",
          statusCode: 400,
          success: false,
        };
      } else if (status === 500) {
        return {
          message: "*Internal Server Error",
          statusCode: 400,
          success: false,
        };
      } else {
        return {
          message: "*Other server error",
          statusCode: 400,
          success: false,
        };
      }
    } else if (error.request) {
      if (error.code === "ECONNABORTED") {
        return {
          message: "*Request time out",
          statusCode: 400,
          success: false,
        };
      } else {
        return {
          message: "*Network Error",
          statusCode: 400,
          success: false,
        };
      }
    } else {
      return {
        message: error?.message,
        statusCode: 400,
        success: false,
      };
    }
  }
};
