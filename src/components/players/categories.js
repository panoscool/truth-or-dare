import React from "react";

const Categories = props => {
  return (
    <div className="categories">
      <select className="custom-select my-3" onChange={props.handleCategory}>
        <option defaultValue>Choose a category...</option>
        <option value="funny">Funny</option>
        <option value="challenging">Challenging</option>
        <option value="adults">Adults</option>
      </select>
    </div>
  );
};

export default Categories;
