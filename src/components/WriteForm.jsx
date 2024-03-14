// src/components/WriteForm.jsx
import { useState } from "react";

const WriteForm = ({ onBlogSubmitted }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onBlogSubmitted({ title, tags, content });
    setTitle("");
    setTags("");
    setContent("");
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter your blog title"
            className="border p-2 w-full my-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Tags example JavaScript, React etc"
            className="border p-2 w-full my-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Write your blog comment"
            className="border p-2 w-full my-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create blog
        </button>
      </form>
    </div>
  );
};

export default WriteForm;
