// src/components/AuthorProfile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorProfile = () => {
  const { id } = useParams(); // Get the author's ID from the URL
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch author's profile information
    const fetchAuthor = async () => {
      // Make sure to include authorization logic here (Bearer token)
      // Update 'your_access_token' with your actual access token
      const token = "your_access_token";
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAuthor(data);
      } catch (e) {
        console.error("Failed to fetch author's profile:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  if (isLoading) return <div>Loading author's profile...</div>;
  if (error) return <div>Error loading profile: {error}</div>;
  if (!author) return <div>Author's profile not found.</div>;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <img
        className="w-32 h-32 rounded-full object-cover"
        src={author.avatar}
        alt={`${author.firstName} ${author.lastName}`}
      />
      <h1 className="text-xl font-semibold mt-4">
        {author.firstName} {author.lastName}
      </h1>
      <p className="text-gray-600 mt-2 text-center">{author.bio}</p>

      {/* Include any additional information you want to display about the author here */}
    </div>
  );
};

export default AuthorProfile;
