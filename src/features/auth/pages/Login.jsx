import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../../../firebase";

import AuthLayout
from "../../../layouts/AuthLayout";

import useAuthStore
from "../../../store/authStore";

import {
  loginUser,
  googleLogin,
} from "../services/authApi";

function Login() {

  const navigate =
    useNavigate();

  const login =
    useAuthStore(
      (state) => state.login
    );

  const [formData,
    setFormData] =
    useState({

      email: "",
      password: "",

    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await loginUser(
            formData
          );

        login(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        localStorage.setItem(
          "token",
          data.token
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleGoogleLogin =
  async () => {

    try {

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const idToken =
        await result.user
          .getIdToken();

      const data =
        await googleLogin(
          idToken
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      login(data.user);

      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

    }

};

  return (

    <AuthLayout>

      <div className="w-full max-w-sm">

        <div className="mb-8">

          <h2 className="text-4xl font-black text-white tracking-tight">

            Welcome Back

          </h2>

          <p className="text-slate-400 mt-3 leading-7">

            Continue your AI interview
            preparation journey.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="text-sm font-medium text-slate-300 block mb-2">

              Email

            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#020617] border border-white/10 text-white rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-300 block mb-2">

              Password

            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#020617] border border-white/10 text-white rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />

          </div>

          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl py-3.5 font-semibold hover:scale-[1.02] transition-all"
          >

            Login

          </button>

        </form>

        <div className="relative my-6">

          <div className="absolute inset-0 flex items-center">

            <div className="w-full border-t border-white/10"></div>

          </div>

          <div className="relative flex justify-center text-xs">

            <span className="bg-[#0F172A] px-3 text-slate-500 tracking-wide">

              OR CONTINUE WITH

            </span>

          </div>

        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-white/10 bg-[#020617] text-white rounded-2xl py-3.5 font-medium flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
        >

          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />

          Continue with Google

        </button>

        <p className="mt-7 text-center text-sm text-slate-400">

          Don’t have an account?
          {" "}

          <span
            onClick={() =>
              navigate(
                "/signup"
              )
            }
            className="text-indigo-400 font-semibold cursor-pointer"
          >

            Signup

          </span>

        </p>

      </div>

    </AuthLayout>

  );

}

export default Login;