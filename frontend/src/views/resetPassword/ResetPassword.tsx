import React, { useEffect, useState } from "react";
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
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function ResetPassword() {
  let token = Cookies.get("authToken") as string;

  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");

  const [errors, setErrors] = useState<TErrors>();
  const [loading, setLoading] = useState<boolean>(false);

  const [statusReset, setStatusReset] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    type TokenPayload = {
      email: string;
      exp: number;
      iat: number;
      id: number;
      name: string;
    };
    const decodedToken = jwtDecode<TokenPayload>(token);
    setEmail(decodedToken.email);
  }, []);

  const resetPassword = async () => {
    setLoading(true);
    setErrors(VErrors);

    try {
      let response = await axios.patch(
        `/api/user/reset_password/${email}`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setStatusReset(true);
      setAlertMessage(response.data.msg);
      removeState();
    } catch (error: any) {
      setErrors(error.response.data.errors);
      setLoading(false);
    }
  };

  const removeState = () => {
    setOldPassword("");
    setNewPassword("");
    setNewPasswordConfirmation("");
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            {statusReset ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-3 rounded relative"
                role="alert"
              >
                <p className="block sm:inline">{alertMessage}</p>
              </div>
            ) : (
              ""
            )}
            <form>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="old_password">Old Password</Label>
                  <Input
                    id="old_password"
                    placeholder="Password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {errors && errors.param === "old_password" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    placeholder="Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {errors && errors.param === "new_password" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password_confirmation">
                    New Password Confirmation
                  </Label>
                  <Input
                    id="password_confirmation"
                    placeholder="Password Confirmation"
                    type="password"
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  />
                  {errors && errors.param === "new_password_confirmation" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" onClick={resetPassword}>
              Reset now{" "}
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
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
