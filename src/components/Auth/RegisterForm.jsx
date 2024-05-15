import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import api from "../../Api/api";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../Utils/store";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  const [email, setEmail] = useState("");
  const [processed, setProcessed] = useState(true);
  const setError = useSetRecoilState(error_message);
  const setSuccess = useSetRecoilState(success_message);

  const navigate = useNavigate();

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      fieldset: {
        borderColor: "rgba(255,255,255,0.6)", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "white", // Change border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fcd34d", // Change focus border color
      },
      "& .MuiInputBase-input": {
        color: "white", // Change text color
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.85)",
      "&.Mui-focused": {
        color: "#fcd34d", // Change label color on focus
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
    setProcessed(false);
    if (password.length >= 6) {
      if (password === c_password) {
        const data = { username, password, email };

        try {
          await api.post("/register/", data);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          setSuccess("Registered successfully!");
          clearSuccess();
          navigate("/login");
        } catch (e) {
          setError("Username and email should be unique");
          clearError();
        }
      } else {
        setError("Passwords do not match");
        clearError();
      }
    } else {
      setError("Password length should be more than 6");
      clearError();
    }
    setProcessed(true);
  };

  return (
    <>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextField
          className="w-full focus:border-amber-300"
          label="Username"
          name="username"
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

        <TextField
          className="w-full"
          label="Confirm Password"
          type="password"
          name="c_password"
          value={c_password}
          onChange={(e) => setC_Password(e.target.value)}
          sx={inputStyles}
          required
        />

        <TextField
          className="w-full"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          sx={inputStyles}
          required
        />

        <div className="flex justify-end text-white">
          <Typography variant="button" gutterBottom>
            Already registered?
          </Typography>
          <Link to="/login">
            <Typography variant="button" className="p-2 hover:text-amber-300">
              Login
            </Typography>
          </Link>
        </div>

        <Button type="submit" variant="contained" size="large">
          {processed ? "Sign Up" : "Processing..."}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
