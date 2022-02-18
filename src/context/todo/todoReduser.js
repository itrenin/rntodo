import {
  ADD_TODO,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_LOADER,
  UPDATE_TODO,
  CLEAR_ERROR,
  SHOW_ERROR,
  FETCH_TODOS,
} from '../types'
const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        title,
      },
    ],
  }),
  [REMOVE_TODO]: (state, { id }) => {
    //debug
    // for (let i in state.todos) {
    //   console.log(state.todos[i].id)
    // }
    let newTodos = []
    for (let i in state.todos) {
      if (state.todos[i].id !== id) newTodos.push(state.todos[i])
    }
    // console.log(newTodos)
    const newState = { ...state, todos: newTodos }
    // return {
    //   ...state,
    //   todos: state.todos.filter((todo) => {
    //     todo.id === id
    //   }),
    // }

    return newState
  },
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    }),
  }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: false }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  DEFAULT: (state) => state,
}
export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
