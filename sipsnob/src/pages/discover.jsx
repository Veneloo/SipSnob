import React from "react";
import axios from "axios";
import "./pages.css"; // Import your CSS file

const Discover = () => {
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/coffee-shops?lat=40.7128&lng=-74.0060");
      setShops(response.data);
    } catch (error) {
      console.error("Error fetching coffee shops", error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <div className="page-container">
      {/* Heading */}
      <h1 style={{ fontSize: "1.875rem", color: "#5a3e2b", marginBottom: "1rem" }}>
        Discover Coffee Shops
      </h1>

      {/* Refresh Button */}
      <button
        style={{
          backgroundColor: "#5a3e2b",
          color: "#fff",
          padding: "0.4rem 1rem",
          borderRadius: "0.25rem",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          maxWidth: "200px",
          margin: "10px auto",
          display: "block",
          fontFamily: "'Young Serif', serif", // Ensures correct font
        }}
      >
        Refresh Selection
      </button>

      {/* Coffee Shop List */}
      <div style={{ marginTop: "1rem" }}>
        <div
          style={{
            backgroundColor: "#d7b899",
            padding: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            margin: "0.75rem auto",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem" }}>
            Blank Street (71st & Lex)
          </h2>
          <p style={{ fontSize: "0.875rem" }}>68 ft away • 985 Lexington Ave, NY</p>
          <p style={{ fontSize: "0.875rem" }}>Today’s Hours: 6:30 AM - 6 PM</p>
          <button
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#5a3e2b",
              color: "#fff",
              padding: "0.25rem 0.75rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "'Young Serif', serif", // Ensures correct font
            }}
          >
            Shop Details
          </button>
        </div>

        <div
          style={{
            backgroundColor: "#d7b899",
            padding: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            margin: "0.75rem auto",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem" }}>
            Blue Bottle Coffee
          </h2>
          <p style={{ fontSize: "0.875rem" }}>0.2 miles away • 10th Ave, NY</p>
          <p style={{ fontSize: "0.875rem" }}>Today’s Hours: 7 AM - 7 PM</p>
          <button
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#5a3e2b",
              color: "#fff",
              padding: "0.25rem 0.75rem",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "'Young Serif', serif", // Ensures correct font
            }}
          >
            Shop Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
