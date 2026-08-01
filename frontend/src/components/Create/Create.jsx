import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";
import "./Create.css";

export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const categorySuggestions = [
    "Technology",
    "Education",
    "Entertainment",
    "Sports & Fitness",
    "Gaming",
    "Cultural Event",
    "Games",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const selectCategorySuggestion = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.category.trim()) {
      toast.error("Please enter or select a category");
      return;
    }
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    setSubmitting(true);

    const data = new FormData();
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", image);

    try {
      const token = localStorage.getItem("token");
      if (!token || token === "null" || token === "undefined") {
        toast.error("You must be logged in to create a post.");
        navigate("/login");
        setSubmitting(false);
        return;
      }

      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (res.status === 401 || res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("authChange"));
        toast.error(errData.error || "Session expired. Please log in again.");
        navigate("/login");
        setSubmitting(false);
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to create post");
      }

      const newPost = await res.json();
      toast.success("Post created successfully!");
      navigate(`/posts/${newPost._id}`);
    } catch (err) {
      toast.error("Error creating post: " + err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-4 mb-5">
        <div className="create-card">
          <h2 className="create-title">Create a New Post</h2>
          <p className="create-subtitle">Share your thoughts, photos, and ideas with your circle.</p>

          <form onSubmit={handleSubmit} className="create-form" noValidate>
            {/* Category Input with Pre-written Suggestions */}
            <div className="mb-4">
              <label htmlFor="category" className="form-label-custom">
                Category
              </label>
              <input
                type="text"
                className="form-control-custom"
                id="category"
                name="category"
                placeholder="Enter category or pick a suggestion below..."
                value={formData.category}
                onChange={handleChange}
                required
              />

              {/* Pre-written Category Pills */}
              <div className="category-suggestions mt-2">
                <small className="text-muted d-block mb-1" style={{ fontSize: "0.78rem" }}>
                  Quick Suggestions:
                </small>
                <div className="d-flex flex-wrap gap-2">
                  {categorySuggestions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`category-pill-btn ${formData.category === cat ? "active" : ""}`}
                      onClick={() => selectCategorySuggestion(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="mb-4">
              <label htmlFor="image" className="form-label-custom">
                Image Attachment
              </label>
              <input
                type="file"
                className="form-control-custom"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="form-label-custom">
                Description
              </label>
              <textarea
                className="form-control-custom"
                id="description"
                name="description"
                rows="4"
                placeholder="Write something engaging about your post..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="create-submit-btn"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Publishing...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane me-1"></i>
                  Create Post
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
