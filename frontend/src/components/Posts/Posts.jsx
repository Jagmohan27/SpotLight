import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";

  const categoriesList = [
    "All",
    "Technology",
    "Education",
    "Entertainment",
    "Sports & Fitness",
    "Gaming",
    "Cultural Event",
    "Games",
  ];

  useEffect(() => {
    fetch(`${BASE_URL}/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (cat) => {
    if (cat === "All") {
      const params = new URLSearchParams(searchParams);
      params.delete("category");
      setSearchParams(params);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), category: cat });
    }
  };

  // Filter posts by category & search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const clearFilters = () => {
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="pinterest-loading-container">
        <div className="pinterest-spinner"></div>
        <p className="pinterest-loading-text">Inspirations loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-error-container">
        <i className="fa-solid fa-triangle-exclamation posts-error-icon"></i>
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pinterest-explore-page">
      {/* Pinterest Top Header & Filter Bar */}
      <div className="pinterest-header-wrapper">
        <div className="container text-center">
          <h1 className="pinterest-title">Explore Ideas & Community Pins</h1>
          <p className="pinterest-subtitle">
            Discover curated visual posts, educational topics, cultural moments, and tech innovations.
          </p>

          {/* Pinterest Category Filter Pills */}
          <div className="pinterest-categories-bar">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                className={`pinterest-category-pill ${selectedCategory === cat && !searchQuery ? "active" : ""}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Search / Filter Indicator */}
      <div className="container">
        {(searchQuery || selectedCategory !== "All") && (
          <div className="pinterest-filter-indicator">
            <span>
              Showing pins for:{" "}
              <strong>
                {selectedCategory !== "All" ? selectedCategory : `"${searchQuery}"`}
              </strong>{" "}
              ({filteredPosts.length} {filteredPosts.length === 1 ? "pin" : "pins"})
            </span>
            <button className="pinterest-clear-btn" onClick={clearFilters}>
              <i className="fa-solid fa-xmark"></i> Clear Filters
            </button>
          </div>
        )}

        {/* Pinterest Masonry Pin Grid */}
        {filteredPosts.length === 0 ? (
          <div className="pinterest-empty-state">
            <i className="fa-brands fa-pinterest pinterest-empty-icon"></i>
            <h3>No pins found</h3>
            <p>Try clearing filters or search for another keyword.</p>
            <button className="pinterest-reset-btn" onClick={clearFilters}>
              View All Pins
            </button>
          </div>
        ) : (
          <div className="pinterest-masonry-grid">
            {filteredPosts.map((post) => (
              <div className="pinterest-pin-wrapper" key={post._id}>
                <Link to={`/posts/${post._id}`} className="pinterest-pin-link">
                  <div className="pinterest-pin-card">
                    {/* Image Container */}
                    <div className="pinterest-pin-img-wrapper">
                      {post.image && post.image.url ? (
                        <img
                          src={post.image.url}
                          alt={post.category || "Spotlight pin"}
                          className="pinterest-pin-img"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                      ) : (
                        <div className="pinterest-pin-placeholder">
                          <span>{post.category}</span>
                        </div>
                      )}

                      {/* Pinterest Hover Overlay */}
                      <div className="pinterest-pin-overlay">
                        <div className="pinterest-overlay-top">
                          <span className="pinterest-pin-badge">{post.category}</span>
                          <button
                            className="pinterest-save-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              alert(`Saved "${post.category}" pin to your board!`);
                            }}
                          >
                            Save
                          </button>
                        </div>
                        <div className="pinterest-overlay-bottom">
                          <div className="pinterest-author-pill">
                            <i className="fa-solid fa-circle-user"></i>
                            <span>{post.owner ? post.owner.username || post.owner : "Creator"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pin Info Below Image */}
                    <div className="pinterest-pin-info">
                      <h4 className="pinterest-pin-title">
                        {post.description
                          ? post.description.length > 55
                            ? post.description.substring(0, 55) + "..."
                            : post.description
                          : post.category}
                      </h4>
                      <div className="pinterest-pin-meta">
                        <span className="pinterest-pin-comments">
                          <i className="fa-regular fa-comment"></i>
                          {post.comment ? post.comment.length : 0}
                        </span>
                        <span className="pinterest-pin-date">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
