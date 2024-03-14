// src/components/PopularBlogs.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularBlogs = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs/popular")
      .then((response) => response.json())
      .then((data) => setPopularBlogs(data.blogs))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-4">Most Popular</h2>
      {popularBlogs.map((blog) => (
        <div
          key={blog.id}
          className="mb-4 p-4 border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <Link
            to={`/blog/${blog.id}`}
            className="font-semibold text-lg hover:text-blue-600 hover:underline"
          >
            {blog.title}
          </Link>
          <div className="flex justify-between items-center mt-2 text-sm">
            <Link
              to={`/author/${blog.author.id}`}
              className="text-gray-600 hover:underline"
            >
              {blog.author.firstName} {blog.author.lastName}
            </Link>
            <span className="text-gray-500">{blog.likes.length} Likes</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularBlogs;
