import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import api from "../../Api/api";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../Utils/store";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setError = useSetRecoilState(error_message);
  const setSuccess = useSetRecoilState(success_message);

  const navigate = useNavigate();

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      fieldset: {
        borderColor: "rgba(255,255,255,0.6)",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fcd34d",
      },
      "& .MuiInputBase-input": {
        color: "white",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.85)",
      "&.Mui-focused": {
        color: "#fcd34d",
      },
    },
  };

  const clearSuccess = () => {
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: username, password };
    console.log(data);

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      localStorage.setItem("usertoken", responseData.token);
      localStorage.setItem("user", responseData.user);
      setSuccess("Logged in successfully");
      clearSuccess();
      navigate("/home");
    } catch (e) {
      console.log("error", e);

      setError("Unable to login with provided credentials");
      clearError();
    }
  };

  return (
    <>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextField
          className="w-full"
          label="Email"
          name="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          sx={inputStyles}
          required
        />

        <TextField
          className="w-full"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyles}
          required
        />

        <div className="flex justify-between gap-2 text-white">
          <Link to="/forgot-password">
            <Typography
              variant="button"
              gutterBottom
              className="p-2 hover:text-amber-300"
            >
              Forgot Password
            </Typography>
          </Link>

          <Link to="/register">
            <Typography
              variant="button"
              gutterBottom
              className="p-2 hover:text-amber-300"
            >
              Register
            </Typography>
          </Link>
        </div>

        <Button type="submit" variant="contained" size="large">
          Sign In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
