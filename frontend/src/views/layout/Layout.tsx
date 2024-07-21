import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "@/interceptor/axios";

// HANDLE REDUX
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../redux/auth/action";

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  const token = Cookies.get("authToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  const logout = async (e: any) => {
    e.preventDefault();
    try {
      let response = await axios.get(`/api/auth/signout/${user.email}`);

      Cookies.remove("authToken");
      navigate("/signin");

      toast.success(response.data.msg, {
        position: "top-left",
      });
      dispatch(authLogout());
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        position: "top-left",
      });
    }
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-betw sm:items-stretch sm:justify-between">
              <div className="flex flex-shrink-0 items-center">
                <NavLink to="/">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {token ? (
                    <>
                      <NavLink
                        to={"/dashboard"}
                        className={classNames(
                          "active"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to={"/profile"}
                        className={classNames(
                          "active"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to={"/reset_password"}
                        className={classNames(
                          "active"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        Reset Password
                      </NavLink>
                      <DisclosureButton
                        onClick={logout}
                        className={
                          "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      >
                        LogOut
                      </DisclosureButton>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to={"/signin"}
                        className={classNames(
                          "active"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        SignIn
                      </NavLink>
                      <NavLink
                        to={"/signup"}
                        className={classNames(
                          "active"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        SignUp
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 ">
            {token ? (
              <>
                <NavLink to="/dashboard">
                  <DisclosureButton
                    as="a"
                    className={classNames(
                      "active"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    Dashboard
                  </DisclosureButton>
                </NavLink>
                <NavLink to="/profile">
                  <DisclosureButton
                    as="a"
                    className={classNames(
                      "active"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    Profile
                  </DisclosureButton>
                </NavLink>
                <NavLink to="/reset_password">
                  <DisclosureButton
                    as="a"
                    className={classNames(
                      "active"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    Reset Password
                  </DisclosureButton>
                </NavLink>
                <DisclosureButton
                  as="a"
                  onClick={logout}
                  className={classNames(
                    "active"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  LogOut
                </DisclosureButton>
              </>
            ) : (
              <>
                <NavLink to="/signin">
                  <DisclosureButton
                    as="a"
                    className={classNames(
                      "active"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    SignIn
                  </DisclosureButton>
                </NavLink>
                <NavLink to="/signup">
                  <DisclosureButton
                    as="a"
                    className={classNames(
                      "active"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    SignUp
                  </DisclosureButton>
                </NavLink>
              </>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {children}
    </>
  );
}

export default Layout;
