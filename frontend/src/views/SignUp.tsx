import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/interceptor/axios";
import { TErrors } from "@/datatype";
import { VErrors } from "@/datatype/value";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// LOGIN GOOGLE AND FACEBOOK
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { FaFacebook } from "react-icons/fa";

// HANDLE REDUX
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/auth/action";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const [emailSendLinkVerification, setEmailSendLinkVerification] =
    useState<string>("");

  const [errors, setErrors] = useState<TErrors>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSendMail, setLoadingSendMail] = useState<boolean>(false);

  const [statusSignUp, setStatusSignUp] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const signUp = async () => {
    setErrors(VErrors);
    setLoading(true);

    try {
      setEmailSendLinkVerification(email);

      let response = await axios.post("/api/auth/signup", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      removeState();
      setStatusSignUp(true);
      setAlertMessage(response.data.msg);
      setLoading(false);
    } catch (error: any) {
      setErrors(error.response.data.errors);
      setLoading(false);
    }
  };

  const signUpByGoogle = async (data: any) => {
    try {
      const token: string = data.credential;
      const decodedToken: any = jwtDecode(token);
      const name: string = decodedToken.name;
      const email: string = decodedToken.email;

      let response = await axios.post("/api/auth/signup_by_google", {
        name: name,
        email: email,
      });

      Cookies.set("authToken", response.data.token);
      navigate("/dashboard");

      // SAVE DATA TO REDUX
      dispatch(authLogin(response.data.data));
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        position: "top-left",
      });
    }
  };

  const signUpByFacebook = async (data: any) => {
    try {
      const name: string = data.name;
      const email: string = data.email;
      let response = await axios.post("/api/auth/signup_by_facebook", {
        name: name,
        email: email,
      });

      Cookies.set("authToken", response.data.token);
      navigate("/dashboard");

      // SAVE DATA TO REDUX
      dispatch(authLogin(response.data.data));
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        position: "top-left",
      });
    }
  };

  const sendMailMore = async () => {
    setLoadingSendMail(true);
    try {
      let response = await axios.post("/api/auth/send_mail_more", {
        email: emailSendLinkVerification,
      });
      setLoadingSendMail(false);
      toast.success(response.data.msg, {
        position: "top-right",
      });
    } catch (error) {
      setLoadingSendMail(false);
    }
  };

  const removeState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Sign Up User</CardDescription>
          </CardHeader>
          <CardContent>
            {statusSignUp ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-3 rounded relative"
                role="alert"
              >
                <p className="block sm:inline">
                  {alertMessage}, please check your email to activation user.
                  Don't have email verification please click{" "}
                  {loadingSendMail ? (
                    <strong className="font-bold cursor-not-allowed">
                      here!{" "}
                    </strong>
                  ) : (
                    <strong
                      className="font-bold cursor-pointer"
                      onClick={sendMailMore}
                    >
                      here!{" "}
                    </strong>
                  )}
                  {loadingSendMail ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                      width="30"
                      height="30"
                      style={{
                        shapeRendering: "auto",
                        display: "inline",
                        background: "transparent",
                      }}
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <g>
                        <rect
                          fill="#15803D"
                          height="40"
                          width="15"
                          y="30"
                          x="17.5"
                        >
                          <animate
                            begin="-0.2s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                            values="18;30;30"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="y"
                          ></animate>
                          <animate
                            begin="-0.2s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                            values="64;40;40"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="height"
                          ></animate>
                        </rect>
                        <rect
                          fill="#15803D"
                          height="40"
                          width="15"
                          y="30"
                          x="42.5"
                        >
                          <animate
                            begin="-0.1s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                            values="20.999999999999996;30;30"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="y"
                          ></animate>
                          <animate
                            begin="-0.1s"
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                            values="58.00000000000001;40;40"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="height"
                          ></animate>
                        </rect>
                        <rect
                          fill="#15803D"
                          height="40"
                          width="15"
                          y="30"
                          x="67.5"
                        >
                          <animate
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                            values="20.999999999999996;30;30"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="y"
                          ></animate>
                          <animate
                            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                            values="58.00000000000001;40;40"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="height"
                          ></animate>
                        </rect>
                        <g></g>
                      </g>
                    </svg>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            ) : (
              ""
            )}
            <form>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  {errors && errors.param === "name" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  {errors && errors.param === "email" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  {errors && errors.param === "password" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password_confirmation">
                    Password Confirmation
                  </Label>
                  <Input
                    id="password_confirmation"
                    placeholder="Password Confirmation"
                    type="password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    value={passwordConfirmation}
                  />
                  {errors && errors.param === "password_confirmation" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" onClick={() => signUp()}>
              Sign Up{" "}
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                  width="30"
                  height="30"
                  style={{
                    shapeRendering: "auto",
                    display: "block",
                    background: "transparent",
                  }}
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <rect fill="#ffffff" height="40" width="15" y="30" x="17.5">
                      <animate
                        begin="-0.2s"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        values="18;30;30"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="y"
                      ></animate>
                      <animate
                        begin="-0.2s"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        values="64;40;40"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="height"
                      ></animate>
                    </rect>
                    <rect fill="#ffffff" height="40" width="15" y="30" x="42.5">
                      <animate
                        begin="-0.1s"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        values="20.999999999999996;30;30"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="y"
                      ></animate>
                      <animate
                        begin="-0.1s"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        values="58.00000000000001;40;40"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="height"
                      ></animate>
                    </rect>
                    <rect fill="#ffffff" height="40" width="15" y="30" x="67.5">
                      <animate
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        values="20.999999999999996;30;30"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="y"
                      ></animate>
                      <animate
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        values="58.00000000000001;40;40"
                        keyTimes="0;0.5;1"
                        calcMode="spline"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="height"
                      ></animate>
                    </rect>
                    <g></g>
                  </g>
                </svg>
              ) : (
                ""
              )}
            </Button>
            <section>
              <article className="grid grid-cols-3 gap-4 place-items-center">
                <span className="border-y w-full"></span>
                <h4 className="text-sm w-fit">Social SignUp</h4>
                <span className="border-y w-full"></span>
              </article>
            </section>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                signUpByGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              theme="filled_blue"
              text="signup_with"
              width={100}
              locale="en"
            />
            <FacebookLogin
              appId={import.meta.env.VITE_APPID_FACEBOOK_LOGIN}
              fields="name,email"
              callback={signUpByFacebook}
              icon={<FaFacebook style={{ fontSize: "20px" }} />}
              size="small"
              cssClass="my-facebook-button-class"
              textButton="Sign Up with Facebook"
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
