import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important,
    } = this.props;

    let clasNames = 'todo-list-item';
    if (done) {
      clasNames += 'done';
    }

    if (important) {
      clasNames += 'important';
    }
    return (
      <span className={clasNames}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={onDeleted}
        >
          <i className="fa fa-trash" />
        </button>
      </span>
    );
  }
}
