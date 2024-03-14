// src/components/NavBar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, user, onLogout, onSearch, onWriteClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/" className="text-3xl font-bold text-blue-500">
        React Blogify
      </Link>
      <div className="flex items-center max-w-xs">
        <form onSubmit={handleSearch} className="flex items-center w-full">
          <input
            type="text"
            placeholder="Search blogs..."
            className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-full text-sm"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <button
              onClick={onWriteClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mx-2 text-sm"
            >
              Write
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mx-2 text-sm"
            >
              Logout
            </button>
            <span className="font-semibold text-sm">{user.firstName}</span>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mx-2 text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
