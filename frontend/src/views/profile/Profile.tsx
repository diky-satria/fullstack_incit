import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TErrors, TListOfName } from "@/datatype";
import { VErrors } from "@/datatype/value";
import axios from "@/interceptor/axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Profile() {
  let token = Cookies.get("authToken") as string;
  const { user } = useSelector((state: any) => state.auth);
  const [name, setName] = useState<string>("");

  const [errors, setErrors] = useState<TErrors>();
  const [loading, setLoading] = useState<boolean>(false);

  const [nameSelect, setNameSelect] = useState<string>(user.name);
  const [emailSelect, setEmailSelect] = useState<string>(user.email);

  const [listName, setListName] = useState<TListOfName[]>([]);

  useEffect(() => {
    listOfName();
  }, []);

  const listOfName = async () => {
    try {
      let response = await axios.get(`/api/user/list_of_name/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setListName(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetName = async () => {
    setLoading(true);
    setErrors(VErrors);

    try {
      let response = await axios.patch(
        `/api/user/reset_name/${user.email}`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNameSelect(response.data.data.name);

      listOfName();
      toast.success(response.data.msg, {
        position: "top-left",
      });
      setName("");
      setLoading(false);
    } catch (error: any) {
      setErrors(error.response.data.errors);
      setLoading(false);
    }
  };

  const updateName = async (id: string) => {
    try {
      let response = await axios.get(`/api/user/update_name/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNameSelect(response.data.data.name);
      toast.success(response.data.msg, {
        position: "top-left",
      });
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        position: "top-left",
      });
    }
  };

  return (
    <div className="container">
      <div className="grid sm:grid-cols-12 md:grid-cols-4 py-5 gap-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reset Name</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4 py-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors && errors.param === "name" ? (
                    <p className="text-red-500 text-sm mt-2">{errors.msg}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
            <Button className="w-full py-2" onClick={() => resetName()}>
              Reset name{" "}
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
          </CardContent>
        </Card>
        <Card className="w-full">
          <div className="w-full max-w-xs mx-auto p-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="options"
            >
              Choose Name active:
            </label>
            <select
              id="options"
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                updateName(e.target.value);
              }}
            >
              {listName.map((ln, index) => {
                return (
                  <option key={index} value={ln.id}>
                    {ln.name}
                  </option>
                );
              })}
            </select>
          </div>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Name: {nameSelect}</CardTitle>
            <CardTitle>Email: {emailSelect}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
