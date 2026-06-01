import api from "../../../services/api";

export const signupUser =
  async (userData) => {

    const response =
      await api.post(

        "/auth/signup",

        userData

      );

    return response.data;

};

export const loginUser =
  async (userData) => {

    const response =
      await api.post(

        "/auth/login",

        userData

      );

    return response.data;

};

export const verifyOTP =
  async (otpData) => {

    const response =
      await api.post(

        "/auth/verify-otp",

        otpData

      );

    return response.data;

};
export const googleLogin =
  async (idToken) => {

    const response =
      await api.post(

        "/auth/google",

        { idToken }

      );

    return response.data;

};