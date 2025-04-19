import React, { useState } from "react";
import "./pages.css";

const Ratings = () => {
  const [ratings, setRatings] = useState({
    drinkConsistency: 5,
    ambiance: 5,
    waitTime: 5,
    pricing: 5,
    customerService: 5,
  });

  const [milkOptions, setMilkOptions] = useState([]);
  const [foodAvailable, setFoodAvailable] = useState(null);
  const [sugarFree, setSugarFree] = useState(null);

  const handleRatingChange = (e, category) => {
    setRatings({ ...ratings, [category]: parseInt(e.target.value) });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setMilkOptions(checked
      ? [...milkOptions, value]
      : milkOptions.filter((item) => item !== value)
    );
  };

  return (
    <div
      className="page-container"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        borderRadius: "12px",
        border: "2px solid #8B5E3C",
        padding: "40px",
        backgroundColor: "#f5e1c8",
      }}
    >
      <h1 className="rating-header">Rate Shop</h1>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Blank Street (71st & Lex)</h2>

      <img
        src="https://via.placeholder.com/300x150"
        alt="Coffee Shop"
        style={{
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #8B5E3C",
          marginBottom: "2rem",
        }}
      />

      {/* Ratings sliders */}
      {Object.entries(ratings).map(([category, value]) => (
        <div key={category} style={{ marginBottom: "1.5rem", textAlign: "left" }}>
          <label className="rating-label">
            {category.replace(/([A-Z])/g, " $1")}:
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="range"
              min="1"
              max="10"
              value={value}
              onChange={(e) => handleRatingChange(e, category)}
            />
            <span>{value}</span>
          </div>
        </div>
      ))}

      {/* Alternative Milk Options */}
      <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
        <label className="rating-label">Alternative Milk Options:</label>
        <div className="row-container" style={{ gap: "16px", marginTop: "8px" }}>
          {["Oat", "Almond", "Coconut", "Soy"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={milkOptions.includes(option)}
                onChange={handleCheckboxChange}
              />{" "}
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Food Available */}
      <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
        <label className="rating-label">Food Items Available:</label>
        <div className="row-container" style={{ gap: "16px", marginTop: "8px" }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input
                type="radio"
                name="food"
                checked={foodAvailable === val}
                onChange={() => setFoodAvailable(val)}
              />{" "}
              {val}
            </label>
          ))}
        </div>
      </div>

      {/* Sugar-Free Syrup Options */}
      <div style={{ marginBottom: "2rem", textAlign: "left" }}>
        <label className="rating-label">Sugar-Free Syrup Options Available:</label>
        <div className="row-container" style={{ gap: "16px", marginTop: "8px" }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input
                type="radio"
                name="sugarFree"
                checked={sugarFree === val}
                onChange={() => setSugarFree(val)}
              />{" "}
              {val}
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="button"
        style={{ backgroundColor: "#8B5E3C", color: "white", fontWeight: "bold" }}
      >
        Submit Rating
      </button>
    </div>
  );
};

export default Ratings;
