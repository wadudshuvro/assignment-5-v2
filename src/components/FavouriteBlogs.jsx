// src/components/FavouriteBlogs.jsx
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const FavouriteBlogs = ({ currentUser }) => {
  const [favouriteBlogs, setFavouriteBlogs] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3000/blogs/favourites");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFavouriteBlogs(data.blogs || []); // Ensure it's an array, even if it's empty
      } catch (error) {
        console.error("Fetch error:", error.message);
        setFavouriteBlogs([]); // Ensure state is an array on error
      }
    };

    // Make sure to only fetch favourites if the user is logged in
    if (currentUser) {
      fetchFavourites();
    }
  }, [currentUser]);

  // Render blogs or a fallback if favouriteBlogs is an empty array
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Your Favourites</h2>
      <div>
        {favouriteBlogs.length > 0 ? (
          favouriteBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} currentUser={currentUser} />
          ))
        ) : (
          <p>No favourite blogs to display.</p>
        )}
      </div>
    </div>
  );
};

export default FavouriteBlogs;
