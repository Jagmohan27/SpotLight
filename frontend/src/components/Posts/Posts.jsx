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

  // Default fallback images for each category in case an external URL fails
  const fallbackImages = {
    "Technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "Education": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    "Entertainment": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    "Cultural Event": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    "Gaming": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    "Games": "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80",
    "Sports & Fitness": "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80",
    "Default": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  };

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

  const getFallbackUrl = (category) => {
    return fallbackImages[category] || fallbackImages["Default"];
  };

  if (loading) {
    return (
      <div className="spotlight-loading-container">
        <div className="spotlight-spinner"></div>
        <p className="spotlight-loading-text">Loading Spotlight posts...</p>
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
    <div className="spotlight-explore-page">
      {/* Header & Category Filter Bar */}
      <div className="spotlight-header-wrapper">
        <div className="container text-center">
          <h1 className="spotlight-explore-title">
            Explore <span className="gradient-text">Spotlight</span>
          </h1>
          <p className="spotlight-explore-subtitle">
            Discover curated community posts, educational insights, cultural moments, and tech innovations.
          </p>

          {/* Category Filter Pills */}
          <div className="spotlight-categories-bar">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                className={`spotlight-category-pill ${selectedCategory === cat && !searchQuery ? "active" : ""}`}
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
          <div className="spotlight-filter-indicator">
            <span>
              Showing posts for:{" "}
              <strong>
                {selectedCategory !== "All" ? selectedCategory : `"${searchQuery}"`}
              </strong>{" "}
              ({filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"})
            </span>
            <button className="spotlight-clear-btn" onClick={clearFilters}>
              <i className="fa-solid fa-xmark"></i> Clear Filters
            </button>
          </div>
        )}

        {/* Clean Responsive Grid */}
        {filteredPosts.length === 0 ? (
          <div className="spotlight-empty-state">
            <i className="fa-solid fa-sparkles spotlight-empty-icon"></i>
            <h3>No posts found</h3>
            <p>Try selecting another category or clear filters to view all posts.</p>
            <button className="spotlight-reset-btn" onClick={clearFilters}>
              View All Posts
            </button>
          </div>
        ) : (
          <div className="spotlight-posts-grid">
            {filteredPosts.map((post) => (
              <Link to={`/posts/${post._id}`} className="spotlight-card-link" key={post._id}>
                <div className="spotlight-card">
                  {/* Image Container */}
                  <div className="spotlight-card-img-wrapper">
                    <img
                      src={
                        post.image && post.image.url
                          ? post.image.url
                          : getFallbackUrl(post.category)
                      }
                      alt={post.category || "Spotlight post"}
                      className="spotlight-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getFallbackUrl(post.category);
                      }}
                    />
                    <div className="spotlight-card-overlay">
                      <span className="spotlight-card-category-badge">{post.category}</span>
                      <span className="spotlight-view-btn">
                        View <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="spotlight-card-info">
                    <h4 className="spotlight-card-title">
                      {post.description
                        ? post.description.length > 60
                          ? post.description.substring(0, 60) + "..."
                          : post.description
                        : post.category}
                    </h4>

                    <div className="spotlight-card-footer">
                      <div className="spotlight-card-author">
                        <i className="fa-solid fa-circle-user"></i>
                        <span>
                          {post.owner
                            ? typeof post.owner === "object"
                              ? post.owner.username || "Community"
                              : post.owner
                            : "Community"}
                        </span>
                      </div>

                      <div className="spotlight-card-meta">
                        <span className="spotlight-meta-item">
                          <i className="fa-regular fa-comment"></i>
                          {post.comment ? post.comment.length : 0}
                        </span>
                        <span className="spotlight-meta-item">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
