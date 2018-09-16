import React from "react";

const InputForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-inline input-group-lg">
        <input
          type="text"
          className="form-control my-4"
          placeholder="Add your name here"
          onChange={props.handleChange}
          value={props.value}
        />

        <button type="submit" className="btn btn-info btn-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default InputForm;
