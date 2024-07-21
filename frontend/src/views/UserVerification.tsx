import React, { useEffect, useState } from "react";
import axios from "@/interceptor/axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// HANDLE REDUX
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/auth/action";

const UserVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`/api/auth/verification/${token}`);
        setMessage(response.data.msg);
        Cookies.set("authToken", response.data.token);

        // SAVE DATA TO REDUX
        dispatch(authLogin(response.data.data));

        navigate("/dashboard");
      } catch (error) {
        setMessage("Verification failed. Invalid or expired token.");
      }
    };

    verifyToken();
  }, [token, history]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default UserVerification;
