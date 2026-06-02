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

import {
  signupUser,
  verifyOTP,
} from "../services/authApi";

function Signup() {

  const navigate =
    useNavigate();

  const [step,
    setStep] =
    useState(1);

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      name: "",
      email: "",
      password: "",

    });

  const [otp,
    setOtp] =
    useState("");

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  const handleSendOTP =
  async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
        await signupUser(
          formData
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      navigate("/");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleVerifyOTP =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          await verifyOTP({

            email:
              formData.email,

            otp,

          });

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

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const handleGoogleSignup =
    async () => {

      try {

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const user =
          result.user;

        localStorage.setItem(
          "user",

          JSON.stringify(user)

        );

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

            {
              step === 1
              ? "Create Account"
              : "Verify OTP"
            }

          </h2>

          <p className="text-slate-400 mt-3 leading-7">

            {
              step === 1

              ? "Start your AI interview preparation journey."

              : "Enter the OTP sent to your email."
            }

          </p>

        </div>

        {

          step === 1

          ? (

            <form
              onSubmit={handleSendOTP}
              className="space-y-4"
            >

              <div>

                <label className="text-sm font-medium text-slate-300 block mb-2">

                  Full Name

                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#020617] border border-white/10 text-white rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />

              </div>

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
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#020617] border border-white/10 text-white rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />

              </div>

              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl py-3.5 font-semibold hover:scale-[1.02] transition-all"
              >

                {
                  loading
                  ? "Sending OTP..."
                  : "Send OTP"
                }

              </button>

            </form>

          )

          : (

            <form
              onSubmit={handleVerifyOTP}
              className="space-y-4"
            >

              <div>

                <label className="text-sm font-medium text-slate-300 block mb-2">

                  OTP

                </label>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#020617] border border-white/10 text-white rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-center tracking-[10px] text-lg font-semibold"
                />

              </div>

              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl py-3.5 font-semibold hover:scale-[1.02] transition-all"
              >

                {
                  loading
                  ? "Verifying..."
                  : "Verify & Continue"
                }

              </button>

            </form>

          )

        }

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
          onClick={handleGoogleSignup}
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

          Already have an account?
          {" "}

          <span
            onClick={() =>
              navigate("/")
            }
            className="text-indigo-400 font-semibold cursor-pointer"
          >

            Login

          </span>

        </p>

      </div>

    </AuthLayout>

  );

}

export default Signup;