import React, { useState, useEffect } from "react";
import axios from "axios";

const Discover = () => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");

  // Get user's location and fetch coffee shops
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `http://localhost:5000/coffee-shops?lat=${latitude}&lng=${longitude}`
          );
          setCoffeeShops(response.data);

          // Set the first coffee shop image as the blurred background
          if (response.data.length > 0 && response.data[0].photos) {
            const photoRef = response.data[0].photos[0].photo_reference;
            const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=YOUR_GOOGLE_PLACES_API_KEY`;
            setBackgroundImage(imageUrl);
          }
        } catch (error) {
          console.error("Error fetching coffee shops:", error);
        }
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        filter: "blur(8px)", // Slight blur effect
      }}
    >
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-[#5a3e2b] mb-4">Discover</h1>

        {/* Refresh Button */}
        <button className="bg-[#8B5E3C] text-white py-2 px-4 rounded hover:bg-[#5a3e2b] transition">
          Refresh Selection
        </button>

        {/* Coffee Shop List */}
        <div className="mt-4 space-y-4">
          {coffeeShops.map((shop) => (
            <div key={shop.place_id} className="bg-[#d7b899] p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{shop.name}</h2>
              <p className="text-sm">{shop.address}</p>
              <p className="text-sm">Rating: {shop.rating} ⭐</p>
              <button className="mt-2 bg-[#5a3e2b] text-white py-1 px-3 rounded">
                Shop Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
