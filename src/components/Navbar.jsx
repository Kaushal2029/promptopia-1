import { FaPlus, FaCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import React, { Fragment } from 'react'
import logo from "../assets/tilt_square_logo.webp"
import { Menu, Transition } from "@headlessui/react";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { error_message, success_message } from "../Utils/store";
import Error from "./Error/Error";
import Success from "./Success/success";

const menuItems = [
    { id: 1, label: "Home", icon: FaHome },
    { id: 2, label: "Profile", icon: FaCircleUser },
    { id: 3, label: "Create Prompt", icon: FaPlus },
    { id: 4, label: "Logout", icon: TbLogout }
];

const Navbar = () => {
    const error = useRecoilValue(error_message);
    const success = useRecoilValue(success_message);
    const setError = useSetRecoilState(error_message);

    const profile = localStorage.getItem("username");
    const navigate = useNavigate();

    const handleClick = async (id) => {
        if (id === 1) {
            navigate("/");
        }
        else if (id === 2) {
            navigate(`/profile/${profile}`);
        }
        else if (id === 3) {
            navigate("/create-prompt");
        }
        else if (id === 4) {
            const token = localStorage.getItem("usertoken");
            try {
                const response = await api.post("/logout/", {}, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
                );
                navigate("/login");
            } catch (e) {
                setError("Failed to logout");
                clearError();
            }
        }
    }

    const clearError = () => {
        setTimeout(() => {
            setError("");
        }, 5000);
    };

    return (
        <>
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
                <div className="fixed z-10 top-20 max-w-[95vw] right-4">
                    <Error />
                </div>
            </Transition>
            
            <Transition
                as={Fragment}
                show={success ? true : false}
                enter="transition-all duration-500"
                enterFrom="opacity-0 translate-x-10"
                enterTo="opacity-100 translate-x-0"
                leave="transition-all duration-500"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-10"
            >
                <div className="fixed z-10 top-20 max-w-[95vw] right-4">
                    <Success />
                </div>
            </Transition>

            <div className='sticky top-0 z-20 flex items-center justify-between gap-3 px-5 py-4 bg-black/70 backdrop-blur-md'>
                <div className="flex items-center gap-1">
                    <img src={logo} alt="" className="w-10" />
                    <h1 className="hidden font-mono text-3xl font-bold text-slate-200 sm:block">Promptopia</h1>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold text-white">{profile}</h1>
                    <Menu as="div">
                        <Menu.Button className="p-[0.1rem] rounded-full focus:ring-2 focus:ring-blue-500">
                            <FaCircleUser className="text-3xl fill-amber-300" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Menu.Items className="absolute z-20 grid w-48 p-1 bg-white rounded-md shadow-md right-4">
                                {menuItems.map((item) => (
                                    <Menu.Item key={item.id}>
                                        {({ active }) => (
                                            <div className={`flex items-center gap-2 px-4 py-2 text-base font-semibold text-black rounded-md cursor-pointer ${active && "bg-violet-500 text-white"}`}
                                                onClick={() => handleClick(item.id)}
                                            >
                                                <item.icon className={`${item.id !== 4 ? (active ? "fill-white/70" : "fill-violet-500") : (active ? "stroke-white/70" : "stroke-violet-500")}`} />
                                                {item.label}
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </>
    )
}

export default Navbar