import React from "react";
import { Link } from "react-router-dom";

export default function RightSection({ category, isAlt = false }) {
  if (!category) return null;

  const exploreUrl = `/posts?category=${encodeURIComponent(category.tag)}`;

  return (
    <section className={`category-section ${isAlt ? "category-section-alt" : ""}`}>
      <div className="container">
        <div className="row align-items-center category-card mb-0">
          {/* Content Left */}
          <div className="col-md-7 pe-md-5 order-2 order-md-1">
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
          {/* Image Right */}
          <div className="col-md-5 mb-4 mb-md-0 order-1 order-md-2">
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
        </div>
      </div>
    </section>
  );
}
