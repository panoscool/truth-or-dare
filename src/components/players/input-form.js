import React from "react";

const InputForm = ({ value, handleChange, handleKeyUp, addPlayer }) => {
  return (
    <div className="name-input-form mb-3">
      <input
        type="text"
        className="form-control "
        placeholder="Add your name here"
        onChange={handleChange}
        onKeyDown={handleKeyUp}
        value={value}
      />
      <button className="btn btn-info" onClick={addPlayer}>
        Add
      </button>
    </div>
  );
};

export default InputForm;
