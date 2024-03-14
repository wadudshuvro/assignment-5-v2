// src/components/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/blogs/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching blog detail:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (isLoading) return <div className="text-center mt-6">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  if (!blog) return <div className="text-center mt-6">Blog not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 my-10 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
      <p className="text-lg text-gray-600 mb-5">
        By {blog.author.firstName} {blog.author.lastName}
      </p>
      {blog.thumbnail && (
        <img
          className="w-full rounded-lg mb-5"
          src={blog.thumbnail}
          alt={`Thumbnail for ${blog.title}`}
        />
      )}
      <div
        className="blog-content text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      {/* Add comments section, like button, or other blog details here */}
    </div>
  );
};

export default BlogDetail;
