// src/components/CreateBlogModal.jsx
import { useState } from "react";

const CreateBlogModal = ({ isOpen, onClose, currentUser }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the access token from localStorage

    if (!accessToken) {
      alert("Authentication token not found.");
      return;
    }

    try {
      // Assuming your API expects a string of comma-separated tags
      const tagList = tags.split(",").map((tag) => tag.trim());

      const response = await fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title,
          tags: tagList,
          content,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to create blog.");
      }

      alert("Blog created successfully.");
      onClose(); // Close the modal
      setTitle(""); // Clear form fields
      setTags("");
      setContent("");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-md w-full max-w-lg mx-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create a New Blog Post</h2>
          <button
            onClick={onClose}
            className="text-black text-2xl leading-none hover:text-gray-600"
          >
            &times; {/* Representing close button with '×' character */}
          </button>
        </div>
        <form onSubmit={handleCreateBlog} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogModal;

// Tailwind CSS classes used for styling are applied directly in jsx code.
