import React, { useState } from "react";

const Ratings = () => {
  const [ratings, setRatings] = useState({
    drinkConsistency: 5,
    ambiance: 5,
    waitTime: 5,
    pricing: 5,
    customerService: 5,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const [milkOptions, setMilkOptions] = useState([]);
  const [foodAvailable, setFoodAvailable] = useState(null);
  const [sugarFree, setSugarFree] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRatingChange = (e, category) => {
    setRatings({ ...ratings, [category]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setMilkOptions(checked ? [...milkOptions, value] : milkOptions.filter((item) => item !== value));
  };

  return (
    <div className="min-h-screen bg-[#f5e1c8] flex justify-center items-center p-6">
      <div className="max-w-md w-full bg-[#f5e1c8] p-6 rounded-lg shadow-lg">

        {/* Coffee Shop Info */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#5a3e2b]">SipSnob</h1>
          <h2 className="text-xl font-semibold text-[#5a3e2b] mt-2">Blank Street (71st & Lex)</h2>
          <img src="https://via.placeholder.com/300x150" alt="Coffee Shop" className="w-full rounded-lg mt-3 shadow-md" />
        </div>

        {/* Rating Sliders */}
        <div className="mt-4 space-y-4">
          {Object.keys(ratings).map((key) => (
            <div key={key}>
              <label className="font-semibold text-[#5a3e2b]">{key.replace(/([A-Z])/g, " $1").trim()}:</label>
              <div className="flex justify-between items-center">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ratings[key]}
                  className="w-full bg-[#d7b899] rounded-lg"
                  onChange={(e) => handleRatingChange(e, key)}
                />
                <span className="ml-2 text-[#5a3e2b] font-semibold">{ratings[key]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Milk Options */}
        <div className="mt-6">
          <label className="font-semibold text-[#5a3e2b]">Alternative Milk Options:</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {["Oat", "Almond", "Coconut", "Soy"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={milkOptions.includes(option)}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 accent-[#8B5E3C]"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Food & Sugar-Free Syrup Options */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="font-semibold text-[#5a3e2b]">Food Items Available:</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="food" checked={foodAvailable === "Yes"} onChange={() => setFoodAvailable("Yes")} className="w-5 h-5 accent-[#8B5E3C]" />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="food" checked={foodAvailable === "No"} onChange={() => setFoodAvailable("No")} className="w-5 h-5 accent-[#8B5E3C]" />
                No
              </label>
            </div>
          </div>
          <div>
            <label className="font-semibold text-[#5a3e2b]">Sugar-Free Syrup Options Available:</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="sugarFree" checked={sugarFree === "Yes"} onChange={() => setSugarFree("Yes")} className="w-5 h-5 accent-[#8B5E3C]" />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="sugarFree" checked={sugarFree === "No"} onChange={() => setSugarFree("No")} className="w-5 h-5 accent-[#8B5E3C]" />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button className="bg-[#8B5E3C] text-white py-2 px-6 rounded hover:bg-[#5a3e2b] transition">
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
