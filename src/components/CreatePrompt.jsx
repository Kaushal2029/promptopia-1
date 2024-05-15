import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TopicList from "./TopicList";
import { Button } from "@mui/material";
import { selectedTopic_ } from "../Utils/store";
import { useRecoilValue, useSetRecoilState } from "recoil";
import api from "../Api/api";
import { success_message, error_message } from "../Utils/store";

const CreatePrompt = () => {
  const [prompt, setPrompt] = useState("");
  const selectedTopic = useRecoilValue(selectedTopic_);
  const setSuccess = useSetRecoilState(success_message);
  const setError = useSetRecoilState(error_message);

  useEffect(() => {
    document.title = "Promptopia | Create Prompt";
  }, []);

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
    const token = localStorage.getItem("usertoken");
    const data = { content: prompt, title: selectedTopic};

    try {
      const response = await api.post("/prompt-text/", data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPrompt("");  
      setSuccess("Prompt created successfully");
      clearSuccess();
    } catch (e) {
      setError("Something wrong happend. Try again");
      clearError();
    }
  };

  return (
    <>
      <div className="body">
        <Navbar />
        <div className="grid place-items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 w-[95vw] max-w-[600px] backdrop-blur-3xl rounded-lg grid gap-10 py-10 px-5 sm:px-10 shadow-md my-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Write Prompt
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full resize-none outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:border-blue-500"
                placeholder="Create a character of a boy/girl with name [your name] [position]"
                required
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <TopicList />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "3rem" }}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePrompt;
