import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";
const LOAD = "LOAD";

export const addToDo = (todo) => {
  return {
    type: ADD,
    todo,
  };
};
export const loadToDos = (todos) => {
  return {
    type: LOAD,
    todos,
  };
};

export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOAD:
      return [action.todos];
    case ADD:
      return [{ todo: action.todo, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
