import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios"; // Using axios directly
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../Utils/store";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  const [processed, setProcessed] = useState(true);

  const setError = useSetRecoilState(error_message);
  const setSuccess = useSetRecoilState(success_message);
  const navigate = useNavigate();

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      fieldset: { borderColor: "rgba(255,255,255,0.6)" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "#fcd34d" },
      "& .MuiInputBase-input": { color: "white" },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.85)",
      "&.Mui-focused": { color: "#fcd34d" },
    },
  };

  const clearSuccess = () => setTimeout(() => setSuccess(""), 5000);
  const clearError = () => setTimeout(() => setError(""), 5000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessed(false);

    if (password.length < 6) {
      setError("Password length should be more than 6");
      clearError();
      setProcessed(true);
      return;
    }

    if (password !== c_password) {
      setError("Passwords do not match");
      clearError();
      setProcessed(true);
      return;
    }

    if (!/^\d{10}$/.test(number)) {
      setError("Enter a valid 10-digit phone number");
      clearError();
      setProcessed(true);
      return;
    }

    const data = { name, email, number, password };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/user",
        data
      );
      console.log("Registration Response:", response.data);

      localStorage.setItem("username", name);
      localStorage.setItem("email", email);
      setSuccess("Registered successfully!");
      clearSuccess();
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", {
        message: error.response?.data?.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      clearError();
    }

    setProcessed(true);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <TextField
        className="w-full"
        label="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
        sx={inputStyles}
        required
      />

      <TextField
        className="w-full"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        sx={inputStyles}
        required
      />

      <TextField
        className="w-full"
        label="Phone Number"
        type="tel"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        autoComplete="off"
        sx={inputStyles}
        required
      />

      <TextField
        className="w-full"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={inputStyles}
        required
      />

      <TextField
        className="w-full"
        label="Confirm Password"
        type="password"
        value={c_password}
        onChange={(e) => setC_Password(e.target.value)}
        sx={inputStyles}
        required
      />

      <div className="flex justify-end text-white">
        <Typography variant="button">Already registered?</Typography>
        <Link to="/">
          <Typography variant="button" className="p-2 hover:text-amber-300">
            Login
          </Typography>
        </Link>
      </div>

      <Button type="submit" variant="contained" size="large">
        {processed ? "Sign Up" : "Processing..."}
      </Button>
    </form>
  );
};

export default RegisterForm;
