import { View, StyleSheet } from 'react-native'
import { useState, useContext } from 'react'
import { Navbar } from './components/Navbar'
import { THEME } from './theme'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { TodoContext } from './context/todo/todoContext'

export const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext)
  const [todoId, setTodoId] = useState(null)
  //   const [todos, setTodos] = useState([])

  //   const addTodo = (title) => {
  //     setTodos((prevTodos) => [
  //       ...prevTodos,
  //       {
  //         id: Date.now().toString(),
  //         title,
  //       },
  //     ])
  //   }
  //   const removeTodo = (id) => {
  //     const todo = todos.find((t) => t.id === id)
  //     Alert.alert('Удаление элемента', `Удаляем "${todo.title}"?`, [
  //       {
  //         text: 'Нет',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Удаляем',
  //         style: 'destructive',

  //         onPress: () => {
  //           setTodoId(null)
  //           setTodos((prev) => prev.filter((todo) => todo.id !== id))
  //         },
  //       },
  //     ])
  //   }

  //   const updateTodo = (id, title) => {
  //     setTodos((old) =>
  //       old.map((todo) => {
  //         if (todo.id === id) {
  //           todo.title = title
  //         }
  //         return todo
  //       })
  //     )
  //   }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={(id) => {
        setTodoId(id)
      }}
    ></MainScreen>
  )
  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId)
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goMain={() => {
          setTodoId(null)
        }}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    )
  }
  return (
    <View>
      <Navbar title="ToDo App" />
      <View style={styles.container}>{content}</View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: '90%',
    overflow: 'scroll',
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
  flatlist: {},
})
