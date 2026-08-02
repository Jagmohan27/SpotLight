import React from "react";
import { Link } from "react-router-dom";

export default function LeftSection({ category, isAlt = false }) {
  if (!category) return null;

  const exploreUrl = `/posts?category=${encodeURIComponent(category.tag)}`;

  return (
    <section className={`category-section ${isAlt ? "category-section-alt" : ""}`}>
      <div className="container">
        <div className="row align-items-center category-card mb-0">
          {/* Image Left */}
          <div className="col-md-5 mb-4 mb-md-0">
            <Link to={exploreUrl} className="category-image-link" title={`Explore ${category.tag} Posts`}>
              <div className="category-image-container">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                  loading="lazy"
                />
                <div className="category-image-hover-overlay">
                  <span>Explore {category.tag} <i className="fa-solid fa-arrow-right ms-1"></i></span>
                </div>
              </div>
            </Link>
          </div>
          {/* Content Right */}
          <div className="col-md-7 ps-md-5">
            <Link to={exploreUrl} className="text-decoration-none">
              <span className="category-meta-tag">{category.tag}</span>
            </Link>
            <h3 className="category-heading">
              <Link to={exploreUrl} className="category-heading-link">
                {category.title}
              </Link>
            </h3>
            <p className="category-text mb-4">{category.description}</p>
            
            {/* Interactive Action Button */}
            <Link to={exploreUrl} className="category-action-btn">
              Explore {category.tag} Posts <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
