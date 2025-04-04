import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  prompts_,
  search_,
  error_message,
  success_message,
} from "../Utils/store";
import axios from "axios";

const PromptCards = () => {
  const [books, setBooks] = useRecoilState(prompts_);
  const search = useRecoilValue(search_);
  const setError = useSetRecoilState(error_message);
  const setSuccess = useSetRecoilState(success_message);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [returnDate, setReturnDate] = useState(null);
  const [requestedBooks, setRequestedBooks] = useState([]);

  const clearSuccess = () => setTimeout(() => setSuccess(""), 5000);
  const clearError = () => setTimeout(() => setError(""), 5000);

  const fetchRequestDetails = async () => {
    try {
      const token = localStorage.getItem("usertoken");

      // First fetch user requests
      const userRequestsResponse = await axios.get(
        "http://localhost:8000/api/user/request",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Then fetch carry books from admin API
      const carryBooksResponse = await axios.get(
        "http://localhost:8000/api/admin/carry-books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("=== Book Request Details ===");
      console.log("User Requests:", userRequestsResponse.data);
      console.log("Carry Books:", carryBooksResponse.data);

      // Combine both requests and carry books
      const allRequests = [
        ...(userRequestsResponse.data.requests || []),
        ...(carryBooksResponse.data || []),
      ];

      setRequestedBooks(allRequests);

      const userEmail = localStorage.getItem("email");
      const username = localStorage.getItem("username");
      console.log("\n=== User Details ===");
      console.log("Username:", username);
      console.log("Email:", userEmail);
    } catch (error) {
      console.error(
        "Error fetching request details:",
        error.response?.data || error.message
      );
    }
  };

  const isBookRequested = (bookId) => {
    return requestedBooks.some(
      (request) => request.bookId === bookId || request.book?._id === bookId
    );
  };

  const handleRequestBook = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      const username = localStorage.getItem("username");
      const userEmail = localStorage.getItem("email");

      console.log("\n=== New Book Request ===");
      console.log("Book Details:", {
        bookId: selectedBook._id,
        bookName: selectedBook.name,
        author: selectedBook.authorName,
        genre: selectedBook.genre,
        publishedYear: selectedBook.publishedYear,
      });
      console.log("User Details:", {
        username,
        userEmail,
      });
      console.log("Return Date:", returnDate);

      const response = await axios.post(
        "http://localhost:8000/api/user/request-book",
        {
          bookId: selectedBook._id,
          returnDate: returnDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("\n=== Request Success ===");
      console.log("Response:", response.data);

      setSuccess("Book requested successfully!");
      clearSuccess();
      handleCloseDialog();

      fetchRequestDetails();
    } catch (error) {
      console.error("\n=== Request Error ===");
      console.error("Error:", error.response?.data || error.message);

      setError(error.response?.data?.message || "Failed to request book");
      clearError();
    }
  };

  const handleOpenDialog = (book) => {
    setSelectedBook(book);
    setOpenDialog(true);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 14);
    setReturnDate(defaultDate.toISOString().split("T")[0]);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
    setReturnDate(null);
  };

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
        console.log("\n=== Available Books ===");
        console.log("Response:", response);

        const data = await response.json();
        console.log("Books Data:", data);
        setBooks(data.books);
      } catch (e) {
        console.error("Error fetching books:", e.message);
      }
    };

    fetchBooks();
    fetchRequestDetails();
  }, []);

  useEffect(() => {
    console.log("\n=== Debug Cart State ===");
    console.log("Requested Books:", requestedBooks);
    console.log("Available Books:", books);
  }, [requestedBooks, books]);

  return (
    <>
      {books.length ? (
        books.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative p-6 flex flex-col h-full">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12"></div>

              {/* Status Badge - New Addition */}
              {isBookRequested(item._id) && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  In Cart
                </div>
              )}

              {/* Book Header */}
              <div className="mb-6 relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {item.authorName}
                </p>
              </div>

              {/* Book Details */}
              <div className="flex-grow space-y-4 relative">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {item.genre}
                  </span>
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-full text-sm font-medium">
                    {item.publishedYear}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 relative">
                <button
                  onClick={() => handleOpenDialog(item)}
                  disabled={isBookRequested(item._id)}
                  className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-3 shadow-md
                    ${
                      isBookRequested(item._id)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white"
                    }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {isBookRequested(item._id)
                    ? "Already in Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center min-h-[300px] bg-white rounded-xl shadow-md p-8">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-400">
            No books to display
          </h1>
        </div>
      )}

      {/* Date Selection Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          className: "rounded-xl overflow-hidden",
        }}
      >
        <div className="bg-blue-600">
          <DialogTitle className="text-white flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Select Return Date
          </DialogTitle>
        </div>

        <DialogContent className="mt-6 px-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose your return date
            </label>
            <TextField
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              inputProps={{
                min: new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0],
                max: new Date(new Date().setDate(new Date().getDate() + 30))
                  .toISOString()
                  .split("T")[0],
                className: "w-full p-3 border border-gray-300 rounded-lg",
              }}
              fullWidth
            />
          </div>
        </DialogContent>

        <DialogActions className="p-6 bg-gray-50">
          <button
            onClick={handleCloseDialog}
            className="px-4 py-2 text-gray-600 font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleRequestBook}
            disabled={!returnDate}
            className={`px-6 py-2 rounded-lg font-medium ${
              returnDate
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm Request
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PromptCards;
