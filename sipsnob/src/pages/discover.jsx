import React from "react";

const Discover = () => {
  return (
    <div className="min-h-screen bg-[#f5e1c8]">
      {/* Discover Page Container */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#5a3e2b] mb-4">Discover Coffee Shops</h1>

        {/* Refresh Button */}
        <button className="bg-[#8B5E3C] text-white py-2 px-4 rounded hover:bg-[#5a3e2b] transition">
          Refresh Selection
        </button>

        {/* Coffee Shop List */}
        <div className="mt-4 space-y-4">
          <div className="bg-[#d7b899] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Blank Street (71st & Lex)</h2>
            <p className="text-sm">68 ft away • 985 Lexington Ave, NY</p>
            <p className="text-sm">Today’s Hours: 6:30 AM - 6 PM</p>
            <button className="mt-2 bg-[#5a3e2b] text-white py-1 px-3 rounded">
              Shop Details
            </button>
          </div>

          <div className="bg-[#d7b899] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Blue Bottle Coffee</h2>
            <p className="text-sm">0.2 miles away • 10th Ave, NY</p>
            <p className="text-sm">Today’s Hours: 7 AM - 7 PM</p>
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
