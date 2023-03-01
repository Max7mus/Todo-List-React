import React, { Component } from 'react';

import './add-item.css';

export default class AddItem extends Component {
  state = {
    label: '',
  };
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdd(this.state.label);
    this.setState({ label: '' });
  };
  render() {
    return (
      <form className="add-item d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="Type you need to Do"
          value={this.state.label}
        />
        <button className="btn btn-outline-secondary add-btn">Add Item</button>
      </form>
    );
  }
}
