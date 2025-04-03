import React, { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";
import { useRecoilValue } from "recoil";
import { success_message } from "./Utils/store";
import { Transition } from "@headlessui/react";
import Success from "./components/Success/success";
import "./home.css"
import SearchBar from "./components/SearchBar";
import PromptContainer from "./components/PromptContainer";

const App = () => {
  const success = useRecoilValue(success_message);

  useEffect(() => {
    document.title = "Promptopia | Home"
  }, [])


  return (
    <>
      <div className="min-h-screen body">
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
        <Navbar />
        <SearchBar /> 
        <PromptContainer />
      </div>
    </>
  );
};

export default App;
