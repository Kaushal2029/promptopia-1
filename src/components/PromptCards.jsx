import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CopyPrompt from "./CopyPrompt";
import { Chip } from "@mui/material";
import { useRecoilValue, useRecoilState } from "recoil";
import { prompts_, search_ } from "../Utils/store";
import api from "../Api/api";

const PromptCards = () => {
  const [prompts, setPrompts] = useRecoilState(prompts_);
  const search = useRecoilValue(search_);

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
    ? prompts.filter(
        (item) =>
          item.user.username.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.content.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      {filteredPrompts.length ? (
        filteredPrompts.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col gap-2 items-start py-4 bg-white rounded-md shadow-md sm:h-[175px]"
          >
            <Link
              to={`/profile/${item.user.username}`}
              className="text-lg px-4 py-1 font-semibold text-blue-500 transition-colors duration-300 hover:text-blue-600"
            >
              {item.user.username.toUpperCase()}
            </Link>
            <p className="px-4 text-sm break-all">
              {item.content.length > 87
                ? `${item.content.slice(0, 87)} ...`
                : item.content}
            </p>
            <div className="px-4 sm:absolute left-4 bottom-4 sm:px-0">
              <Chip label={item.title} color="primary" />
            </div>
            <div className="absolute right-4 top-4">
              <CopyPrompt text={item.content} />
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-5xl font-bold text-center no-prompts">
          No prompts to display
        </h1>
      )}
    </>
  );
};

export default PromptCards;
