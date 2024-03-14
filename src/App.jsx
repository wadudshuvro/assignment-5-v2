// src/App.jsx
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthorProfile from "./components/AuthorProfile";
import BlogDetail from "./components/BlogDetail";
import BlogList from "./components/BlogList";
import CreateBlogModal from "./components/CreateBlogModal";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [isCreateBlogModalOpen, setIsCreateBlogModalOpen] = useState(false);

  useEffect(() => {
    // If you want to check user's auth status on app load:
    const checkAuthStatus = () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        setCurrentUser(user);
        // Perform any additional checks such as token expiration, etc.
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (data) => {
    setCurrentUser(data.user);
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    setIsCreateBlogModalOpen(false); // Close create blog modal if open
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
  };

  const openCreateBlogModal = () => {
    if (!currentUser) {
      alert("You must be logged in to write a blog post.");
      return;
    }
    setIsCreateBlogModalOpen(true);
  };

  const closeCreateBlogModal = () => {
    setIsCreateBlogModalOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <NavBar
          isLoggedIn={!!currentUser}
          user={currentUser}
          onLogout={handleLogout}
          onWriteClick={openCreateBlogModal}
        />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<BlogList currentUser={currentUser} />} />
            <Route
              path="/login"
              element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/author/:id" element={<AuthorProfile />} />
            {/* Additional routes can be added here */}
          </Routes>
        </ErrorBoundary>
        {isCreateBlogModalOpen && (
          <CreateBlogModal
            isOpen={isCreateBlogModalOpen}
            onClose={closeCreateBlogModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
