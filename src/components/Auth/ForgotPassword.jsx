import logo from "../../assets/tilt_square_logo.webp";
import { Typography } from "@mui/material";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./auth.css";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { error_message } from "../../Utils/store";
import { useRecoilValue } from "recoil";
import Error from "../Error/Error";

const page = () => {
  const error = useRecoilValue(error_message);

  useEffect(() => {
    document.title = "Promptopia | Forgot Password"
  }, [])


  return (
    <>
      <div className="grid min-h-screen place-items-center auth-body">
        <Transition
          as={Fragment}
          show={error ? true : false}
          enter="transition-all duration-500"
          enterFrom="opacity-0 translate-x-10"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-500"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-10"
        >
          <div className='fixed z-10 top-4 max-w-[95vw] right-4'>
            <Error />
          </div>
        </Transition>
        <div className="bg-black/50 w-[95vw] max-w-[600px] backdrop-blur-3xl rounded-lg py-10 px-5 sm:px-10 grid gap-5 my-5">
          <div className="grid place-items-center">
            <img src={logo} width={100} height={100} alt="" />
          </div>
          <Typography
            variant="button"
            align="center"
            sx={{ fontSize: "35px", color: "white" }}
          >
            Get Password
          </Typography>
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
};

export default page;
