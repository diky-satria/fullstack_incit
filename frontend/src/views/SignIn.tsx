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
import { TErrors } from "@/datatype";
import { VErrors } from "@/datatype/value";
import axios from "@/interceptor/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import ReactFacebookLogin from "react-facebook-login";
import { FaFacebook } from "react-icons/fa";

// HANDLE REDUX
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/auth/action";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<TErrors>();
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async () => {
    setErrors(VErrors);
    setLoading(true);

    try {
      let response = await axios.post("/api/auth/signin", {
        email: email,
        password: password,
      });

      Cookies.set("authToken", response.data.token);
      navigate("/dashboard");

      setLoading(false);
      toast.success(response.data.msg, {
        position: "top-right",
      });

      // SAVE DATA TO REDUX
      dispatch(authLogin(response.data.data));
    } catch (error: any) {
      setErrors(error.response.data.errors);
      setLoading(false);
    }
  };

  const signInByGoogle = async (data: any) => {
    try {
      const token: string = data.credential;
      const decodedToken: any = jwtDecode(token);
      const name: string = decodedToken.name;
      const email: string = decodedToken.email;

      let response = await axios.post("/api/auth/signin_by_google", {
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

  const signInByFacebook = async (data: any) => {
    try {
      const name: string = data.name;
      const email: string = data.email;
      let response = await axios.post("/api/auth/signin_by_facebook", {
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

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Please sign in now</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors && errors.param === "password" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" onClick={() => signIn()}>
              Sign In{" "}
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
                <h4 className="text-sm w-fit">Social SignIn</h4>
                <span className="border-y w-full"></span>
              </article>
            </section>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                signInByGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              theme="filled_blue"
              text="signin_with"
              width={100}
              locale="en"
            />
            <ReactFacebookLogin
              appId={import.meta.env.VITE_APPID_FACEBOOK_LOGIN}
              fields="name,email"
              callback={signInByFacebook}
              icon={<FaFacebook style={{ fontSize: "20px" }} />}
              size="small"
              cssClass="my-facebook-button-class"
              textButton="Sign In with Facebook"
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
