import React from "react";

const Categories = () => {
  return (
    <div className="categories">
      <select className="custom-select my-3">
        <option selected>Choose a category...</option>
        <option value="funny">Funny</option>
        <option value="soft">Soft</option>
        <option value="hot">Hot</option>
      </select>
    </div>
  );
};

export default Categories;
