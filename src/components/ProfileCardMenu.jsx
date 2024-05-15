import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { FaCopy } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { useSetRecoilState } from "recoil";
import { prompts_, success_message, error_message } from "../Utils/store";

const ProfileCardMenu = ({ text, promptId }) => {
  const setPrompts = useSetRecoilState(prompts_);
  const setSuccess = useSetRecoilState(success_message);
  const setError = useSetRecoilState(error_message);

  const menuItems = [
    { id: 1, label: "Copy", icon: FaCopy },
    { id: 2, label: "Edit", icon: HiPencil },
    { id: 3, label: "Delete", icon: HiTrash },
  ];

  const navigate = useNavigate();

  const fetchPrompts = async () => {
    const token = localStorage.getItem("usertoken");

    try {
      const response = await api.get("/prompt-text/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPrompts(response.data);
    } catch (e) {
      console.error(e.message);
    }
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

  const handleClick = async (id) => {
    if (id === 1) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    } else if (id === 2) {
      navigate(`/edit-prompt/${promptId}`);
    } else if (id === 3) {
      const token = localStorage.getItem("usertoken");

      try {
        await api.delete(`/prompt-text/${promptId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setSuccess("Data deleted successfully");
        clearSuccess();
        fetchPrompts();
      } catch (e) {
        setError("Something wrong happend. Try again");
      clearError();
      }
    }
  };

  return (
    <>
      <Menu as="div">
        {/* <Menu.Button className="p-[0.1rem] rounded-full focus:ring-2 focus:ring-blue-500"> */}
        <Menu.Button className="p-2 rounded-md cursor-pointer hover:bg-gray-200">
          <HiDotsVertical className="fill-black/70" />
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
          <Menu.Items className="absolute right-0 z-20 grid p-1 bg-white border-2 rounded-md shadow-md w-36 border-gray-200/70">
            {menuItems.map((item) => (
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <div
                    className={`flex items-center gap-2 px-4 py-2 text-base font-semibold text-black rounded-md cursor-pointer ${
                      active && "bg-violet-500 text-white"
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    <item.icon
                      className={`${
                        item.id !== 4
                          ? active
                            ? "fill-white/70"
                            : "fill-violet-500"
                          : active
                          ? "stroke-white/70"
                          : "stroke-violet-500"
                      }`}
                    />
                    {item.label}
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ProfileCardMenu;
