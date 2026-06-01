import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import AuthLayout
from "../../../layouts/AuthLayout";

import {
  verifyOTP,
} from "../services/authApi";

function VerifyOTP() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [otp,
    setOtp] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleVerify =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          await verifyOTP({

            email,

            otp,

          });

        alert(
          data.message
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          error.response.data.message
        );

      } finally {

        setLoading(false);

      }

  };

  return (

    <AuthLayout>

      <div className="w-full max-w-sm">

        <div className="mb-8">

          <h2 className="text-4xl font-black text-[#111827] tracking-tight">

            Verify OTP

          </h2>

          <p className="text-gray-500 mt-3 leading-7">

            Enter the OTP sent to
            your email address.

          </p>

        </div>

        <form
          onSubmit={handleVerify}
          className="space-y-4"
        >

          <div>

            <label className="text-sm font-medium text-gray-700 block mb-2">

              Email

            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-gray-700 block mb-2">

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
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
            />

          </div>

          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl py-3.5 font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20"
          >

            {
              loading
              ? "Verifying..."
              : "Verify OTP"
            }

          </button>

        </form>

      </div>

    </AuthLayout>

  );

}

export default VerifyOTP;