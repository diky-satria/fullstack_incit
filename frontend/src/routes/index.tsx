import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "@/views/layout/Layout";
import Home from "@/views/Home";
import Dashboard from "@/views/dashboard/Dashboard";
import Profile from "@/views/profile/Profile";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import UserVerification from "@/views/UserVerification";
import AuthNotLoginRoute from "./routeMiddleware/AuthNotLogInRoute";
import AuthLoginRoute from "./routeMiddleware/AuthLoginRoute";
import ResetPassword from "@/views/resetPassword/ResetPassword";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/signin"
        element={
          <AuthLoginRoute>
            <Layout>
              <SignIn />
            </Layout>
          </AuthLoginRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLoginRoute>
            <Layout>
              <SignUp />
            </Layout>
          </AuthLoginRoute>
        }
      />
      <Route
        path="/verification_user/:token"
        element={
          <AuthLoginRoute>
            <Layout>
              <UserVerification />
            </Layout>
          </AuthLoginRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthNotLoginRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </AuthNotLoginRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthNotLoginRoute>
            <Layout>
              <Profile />
            </Layout>
          </AuthNotLoginRoute>
        }
      />
      <Route
        path="/reset_password"
        element={
          <AuthNotLoginRoute>
            <Layout>
              <ResetPassword />
            </Layout>
          </AuthNotLoginRoute>
        }
      />
    </Routes>
  );
}
