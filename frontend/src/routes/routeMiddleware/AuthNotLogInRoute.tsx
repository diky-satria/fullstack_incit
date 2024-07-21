import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

type Props = {
  children: JSX.Element;
};

export default function AuthNotLoginRoute({ children }: Props) {
  const cookie_browser = Cookies.get("authToken");

  return cookie_browser ? <>{children}</> : <Navigate to="/signin" />;
}
