import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CopyPrompt from "./CopyPrompt";
import { Chip } from "@mui/material";
import { useRecoilValue, useRecoilState } from "recoil";
import { prompts_, search_ } from "../Utils/store";

const PromptCards = () => {
  const [books, setBooks] = useRecoilState(prompts_);
  const search = useRecoilValue(search_);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");

    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/books", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        const data = await response.json();
        setBooks(data.books);
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      {books.length ? (
        books.map((item) => (
          <div
            key={item._id}
            className="relative flex flex-col gap-2 items-start py-4 bg-white rounded-md shadow-md sm:h-[175px]"
          >
            <h2 className="text-lg px-4 py-1 font-semibold text-blue-500">
              {item.name}
            </h2>
            <p className="px-4 text-sm break-all">Author: {item.authorName}</p>
            <p className="px-4 text-sm break-all">Genre: {item.genre}</p>
            <p className="px-4 text-sm break-all">
              Published Year: {item.publishedYear}
            </p>
          </div>
        ))
      ) : (
        <h1 className="text-5xl font-bold text-center no-prompts">
          No books to display
        </h1>
      )}
    </>
  );
};

export default PromptCards;
