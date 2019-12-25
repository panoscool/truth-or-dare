import React from 'react';

const Categories = (props) => {
  return (
    <div className="categories">
      <select
        className="custom-select my-3"
        value={props.category}
        onChange={props.handleCategory}
      >
        <option value="funny">Funny</option>
        <option value="challenging">Challenging</option>
        <option value="uncensored">Uncensored</option>
      </select>
    </div>
  );
};

export default Categories;
