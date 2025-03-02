import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-[#8B5E3C] text-white py-2 px-4 rounded hover:bg-[#5a3e2b] transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
