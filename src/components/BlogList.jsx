// src/components/BlogList.jsx
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import FavouriteBlogs from "./FavouriteBlogs";
import PopularBlogs from "./PopularBlogs";

const BlogList = ({ currentUser, searchResults }) => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Helper function to check if the current user is admin
  const isAdmin = currentUser && currentUser.role === "admin";

  useEffect(() => {
    // If searchResults are not present, fetch the blogs
    if (!searchResults && hasMore) {
      const loadBlogs = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/blogs?page=${page}`
          );
          const data = await response.json();
          if (data && data.blogs) {
            setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
            setHasMore(data.page * data.limit < data.total);
          }
        } catch (error) {
          console.error(error);
        }
      };

      loadBlogs();
    }
  }, [page, searchResults]);

  // Function to handle infinite scrolling
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // Check if the user has scrolled to the bottom and if there are no current search results
    if (scrollHeight - scrollTop <= clientHeight) {
      if (hasMore && !searchResults) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  // Determine whether to display search results or the full blog list
  const displayedBlogs = searchResults || blogs;

  return (
    <div>
      <div className="flex w-full flex-col md:flex-row">
        <div
          onScroll={handleScroll}
          className="flex-grow overflow-auto md:w-2/3" // Adjusted widths for two-column layout
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          {/* Render either the search results or all blogs */}
          {displayedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} isAdmin={isAdmin} />
          ))}
          {!searchResults && !hasMore && <div>No more blogs to load.</div>}
        </div>
        <div className="w-full md:w-1/3 pl-4">
          <PopularBlogs />
          <FavouriteBlogs currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default BlogList;
