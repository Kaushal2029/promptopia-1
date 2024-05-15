import React, { useEffect } from "react";
import CopyPrompt from "./CopyPrompt";
import { prompts_ } from "../Utils/store";
import { Chip } from "@mui/material";
import { useRecoilState } from "recoil";
import ProfileCardMenu from "./ProfileCardMenu";
import api from "../Api/api";

const ProfilePromptCards = ({ profile }) => {
  const [prompts, setPrompts] = useRecoilState(prompts_);

  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("usertoken");

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
  }, []);

  const filteredPrompts = prompts.length
    ? prompts.filter((item) => item.user.username === currentUser)
    : [];

  return (
    <>
      {filteredPrompts.length ? (
        filteredPrompts.map(
          (item) =>
            item.user.username === profile && (
              <div
                key={item.id}
                className="relative grid gap-4 py-4 pr-4 bg-white rounded-md shadow-md"
              >
                <p className="px-4 text-sm break-all">
                  {item.content.length > 87
                    ? `${item.content.slice(0, 87)} ...`
                    : item.content}
                </p>
                <div className="px-4">
                  <Chip label={item.title} color="primary" />
                </div>
                <div className="absolute right-1 top-3">
                  {item.user.username === currentUser ? (
                    <ProfileCardMenu text={item.content} promptId={item.id} />
                  ) : (
                    <CopyPrompt />
                  )}
                </div>
              </div>
            )
        )
      ) : (
        <h1 className="text-5xl font-bold text-center no-prompts">
          No prompts to display
        </h1>
      )}
    </>
  );
};

export default ProfilePromptCards;
