import { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { baseURL } from '../../components/api/baseUrl'
import { ScreenContext } from '../screen/screenContext'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types'

import { TodoContext } from './todoContext'
import { todoReducer } from './todoReduser'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }

  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async (title) => {
    const response = await fetch(baseURL + 'todos.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const data = await response.json()
    console.log('Data: ', data)
    dispatch({ type: ADD_TODO, title, id: data.name })
  }

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id)
    Alert.alert('Удаление элемента', `Удаляем "${todo.title}"?`, [
      {
        text: 'Нет',
        style: 'cancel',
      },
      {
        text: 'Удаляем',
        style: 'destructive',

        onPress: async () => {
          changeScreen(null)
          await fetch(`${baseURL}todos/${id}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
          dispatch({ type: REMOVE_TODO, id })
        },
      },
    ])
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await fetch(`${baseURL}todos/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log(e)
    } finally {
    }
  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const response = await fetch(baseURL + 'todos.json', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
      //setTimeout(()=> dispatch({ type: FETCH_TODOS, todos }), 5000)} catch (e) {
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log(e)
    } finally {
      hideLoader()
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })
  const hideLoader = () => dispatch({ type: HIDE_LOADER })
  const showError = (error) => dispatch({ type: SHOW_ERROR, error })
  const clearError = () => dispatch({ type: CLEAR_ERROR })
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
