import React from "react";
import {useEffect } from "react";

import axios from "axios";
import { useAuth } from "../authContex";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Backend_URL=import.meta.env.VITE_BURL
export default function Auth() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const getUserRole = async () => {
    try {
      if (!JSON.parse(localStorage.getItem("token"))) {
        setUser(null);
        return 
      }

      const { data } = await axios.get(`${Backend_URL}/auth/user`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      });
      console.log(data);
      const { status, user } = data;
      if (status === "error") {
        setUser(null);
        return 
      }
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserRole();
  }, []);

  return <Outlet />;
}
