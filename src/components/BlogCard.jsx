// src/components/BlogCard.jsx
import { Menu } from "@headlessui/react";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, isAdmin }) => {
  // Log the isAdmin prop for debugging.
  // Remove this log once you have confirmed the Menu is working properly.
  console.log("Is Admin:", isAdmin);

  return (
    <div className="flex items-start p-4 m-2 bg-white shadow rounded-lg">
      <img
        src={blog.thumbnail || "default-thumbnail.png"} // Use a default thumbnail if none is provided
        alt={`Thumbnail for ${blog.title}`}
        className="w-1/3 rounded"
      />
      <div className="flex flex-col flex-grow ml-4">
        <div className="flex justify-between items-start">
          <Link
            to={`/blog/${blog.id}`}
            className="text-xl font-bold hover:underline"
          >
            {blog.title}
          </Link>
          {isAdmin && (
            <Menu as="div" className="relative">
              <Menu.Button className="text-gray-700 hover:text-gray-900 p-2 rounded focus:outline-none focus:ring">
                ⋮
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-2 bg-white rounded-md shadow-lg focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm leading-5 text-left`}
                      onClick={() => console.log("Editing post")}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm leading-5 text-left`}
                      onClick={() => console.log("Deleting post")}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
        </div>
        <p className="mt-2">{blog.content}</p>
        <div className="mt-2 text-gray-600">
          By{" "}
          <Link to={`/author/${blog.author.id}`} className="hover:underline">
            {blog.author.firstName} {blog.author.lastName}
          </Link>{" "}
          on {dayjs(blog.createdAt).format("MMMM D, YYYY")}
        </div>
        <div className="flex-grow flex items-end justify-end">
          <span className="font-semibold">{blog.likes.length} Likes</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
