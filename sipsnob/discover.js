import React from "react";
import Navbar from "../components/Navbar"; 

const Discover = () => {
  return (
    <div className="bg-[#f5e1c8] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-[#5a3e2b] mb-4">Discover</h1>
        <button className="bg-[#8B5E3C] text-white py-2 px-4 rounded">
          Refresh Selection
        </button>
        <div className="mt-4 space-y-4">
          {/* Placeholder for coffee shop cards */}
          <div className="bg-[#d7b899] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Blank Street (71st & Lex)</h2>
            <p className="text-sm">68 ft away • 985 Lexington Ave, NY</p>
            <p className="text-sm">Today’s Hours: 6:30 AM - 6 PM</p>
            <button className="mt-2 bg-[#5a3e2b] text-white py-1 px-3 rounded">
              Shop Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
