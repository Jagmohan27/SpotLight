import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/HomePage/HomePage.jsx";
import Posts from "./components/Posts/Posts.jsx";
import ShowPost from "./components/ShowPost/ShowPost.jsx";
import Create from "./components/Create/Create.jsx";
import EditPost from "./components/EditPost/EditPost.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const NotFound = () => (
  <div className="container text-center py-5 my-5">
    <h1 className="display-1 fw-bold text-primary">404</h1>
    <h2 className="mb-3">Page Not Found</h2>
    <p className="text-secondary mb-4">The page you are looking for does not exist or has been moved.</p>
    <a href="/" className="btn btn-primary rounded-pill px-4">Back to Home</a>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            }
          />
          <Route path="/posts/:id" element={<ShowPost />} />
          <Route
            path="/posts/:id/edit"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
