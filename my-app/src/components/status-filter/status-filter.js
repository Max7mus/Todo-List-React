import React, { Component } from 'react';
import './status-filter.css';

export default class StatusFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];
  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const classBtn = isActive ? 'btn-info' : 'btn-outline-secondary ';
      return (
        <div className="btn-group">
          <button
            type="button"
            className={`btn ${classBtn}`}
            key={name}
            onClick={() => onFilterChange(name)}
          >
            {label}
          </button>
        </div>
      );
    });

    return <div className="btn-group">{buttons}</div>;
  }
}
