import {
  Routes,
  Route,
} from "react-router-dom";

import Login
from "../features/auth/pages/Login";

import Signup
from "../features/auth/pages/Signup";

import VerifyOTP
from "../features/auth/pages/VerifyOTP";

import Resume
from "../features/resume/pages/Resume";

import ResumeHistory
from "../features/resume/pages/ResumeHistory";

import ResumeBuilder
from "../features/resume/pages/ResumeBuilder";

import ResumePreview
from "../features/resume/pages/ResumePreview";

import MockInterview
from "../features/resume/pages/MockInterview";

import VoiceInterview
from "../features/resume/pages/VoiceInterview";

import Dashboard
from "../features/dashboard/pages/Dashboard";

import DashboardLayout
from "../layouts/DashboardLayout";

import ProtectedRoutes
from "./ProtectedRoutes";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

      <Route
        path="/resume-preview"
        element={<ResumePreview />}
      />

      <Route
        element={

          <ProtectedRoutes>

            <DashboardLayout />

          </ProtectedRoutes>

        }
      >

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/resume"
          element={<Resume />}
        />

        <Route
          path="/resume-history"
          element={<ResumeHistory />}
        />

        <Route
          path="/resume-builder"
          element={<ResumeBuilder />}
        />

        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        <Route
          path="/voice-interview"
          element={<VoiceInterview />}
        />

      </Route>

    </Routes>

  );

}

export default AppRoutes;