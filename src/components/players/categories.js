import React, { Component } from "react";

class Categories extends Component {
  render() {
    return (
      <div className="categories">
        <select
          className="custom-select my-3"
          onChange={this.props.handleCategory}
        >
          <option defaultValue>Choose a category...</option>
          <option value="funny">Funny</option>
          <option value="soft">Soft</option>
          <option value="hot">Hot</option>
        </select>
      </div>
    );
  }
}

export default Categories;
