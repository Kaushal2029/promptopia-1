import React, { useState, useEffect, Suspense } from "react";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";
const ProfilePromptCards = React.lazy(() => import("./ProfilePromptCards"));
import { useParams } from "react-router-dom";
import { prompts_ } from "../Utils/store";
import { useSetRecoilState } from "recoil";
import NotFound from "./Error/NotFound.jsx";
import api from "../Api/api";
import Loader from "./Loader.jsx";

const Profile = () => {
  const { profile } = useParams();
  const setPrompts = useSetRecoilState(prompts_);
  const [userFound, setUserFound] = useState(true);

  useEffect(() => {
    document.title = `Promptopia | ${profile}`;

    const token = localStorage.getItem("usertoken");

    const fetchUser = async () => {
      try {
        await api.get(`/user-check/${profile}`);
        setUserFound(true);
      } catch (e) {
        console.error(e.message)
        setUserFound(false);
      }
    }

    const fetchPrompts = async () => {
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

    fetchPrompts();
    fetchUser();
  }, []);

  return (
    <>
      {userFound ? (
        <div className="body">
          <Navbar />
          <ProfileCard profile={profile} />
          <h1 className="mb-4 text-3xl font-bold text-center">Prompts</h1>
          <div className="grid gap-5 px-5 pb-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            <ProfilePromptCards profile={profile} />
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Profile;
