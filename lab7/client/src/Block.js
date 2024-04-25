import React from "react";

const Block = ({ image, text }) => (
  <div>
    <img src={image} alt="Block" style={{ width: "500px", height: "500px" }} />
    <p>{text}</p>
  </div>
);

export default Block;
