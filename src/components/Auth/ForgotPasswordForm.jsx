import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Api/api";
import { useSetRecoilState } from "recoil";
import { error_message, success_message } from "../../Utils/store";

const ForgotPasswordForm = () => {
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
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const data = { email, password, username };

    try {
      await api.post("/forget-password/", data);
      setSuccess("Password sent to your email");
      clearSuccess();
      navigate("/login");
    } catch (e) {
      setError("Email address not found");
      clearError();
    }
    setProcessed(true);
  };

  return (
    <>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextField
          className="w-full"
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          sx={inputStyles}
          required
        />

        <div className="flex justify-between gap-2 text-white">
          <Link to="/register">
            <Typography
              variant="button"
              gutterBottom
              className="p-2 hover:text-amber-300"
            >
              Register
            </Typography>
          </Link>

          <Link to="/login">
            <Typography
              variant="button"
              gutterBottom
              className="p-2 hover:text-amber-300"
            >
              Login
            </Typography>
          </Link>
        </div>

        <Button type="submit" variant="contained" size="large">
          {processed ? 'Submit' : 'Processing...'}
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
