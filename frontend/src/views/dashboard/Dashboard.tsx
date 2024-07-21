import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TUsers } from "@/datatype";
import axios from "@/interceptor/axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const token = Cookies.get("authToken");

  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalUserActiveToday, setTotalUserActiveToday] = useState<number>(0);
  const [avgUserActiveLast7Days, setAvgUserActiveLast7Days] =
    useState<number>(0);
  const [user, setUser] = useState<TUsers[]>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let response = await axios.get("/api/dashboard", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setTotalUser(response.data.total_user);
      setTotalUserActiveToday(response.data.total_user_active_today);
      setAvgUserActiveLast7Days(response.data.avg_user_active_last_7_days);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dateConvert = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <>
      <div className="container">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 py-5">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Total user signup</CardTitle>
              <CardDescription>{totalUser}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>User active session per day</CardTitle>
              <CardDescription>{totalUserActiveToday}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Average user active session last 7 days</CardTitle>
              <CardDescription>{avgUserActiveLast7Days}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="sm:basis-auto md:basis-auto overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 overflow-x-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">No</th>
                  <th className="py-2 px-4 border-b border-gray-200">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    SignUp Time
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Logged in count
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Last logged out time
                  </th>
                </tr>
              </thead>
              <tbody>
                {user?.map((u, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {u.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {dateConvert(u.createdAt)}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {u.count_login}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {u.time_logout ? dateConvert(u.time_logout) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
