import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPannel from '../search-pannel';
import TodoList from '../todo-list';
import StatusFilter from '../status-filter';
import AddItem from '../add-item';
import './app.css';

export default class App extends Component {
  maxID = 100;

  state = {
    todoData: [
      this.createTodoItem('Learn English'),
      this.createTodoItem('Make React App'),
      this.createTodoItem('Go to the Gym'),
    ],
    term: '',
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  addItem = (txt) => {
    const newItem = this.createTodoItem(txt);

    this.setState(({ todoData }) => {
      const arrNew = [...todoData, newItem];
      return {
        todoData: arrNew,
      };
    });
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxID++,
    };
  }

  onToggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleProperty(todoData, id, 'important'),
      };
    });
  };
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleProperty(todoData, id, 'done'),
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPannel onSearchChange={this.onSearchChange} />
          <StatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onItemAdd={this.addItem} />
      </div>
    );
  }
}
