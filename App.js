import { useState } from 'react'
// import { Asset } from 'expo-asset'
import AppLoading from 'expo-app-loading'
// import { AppLoading } from 'expo'
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'

import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'
import { THEME } from './src/theme'

async function loadApp() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  const addTodo = (title) => {
    //   const newTodo = {
    //     id: Date.now().toString,
    //     title: title,
    //   }
    // }
    // setTodos((prevTodos) => {
    //   return [...prevTodos, newTodo]
    // })

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now().toString(),
        title,
      },
    ])
  }
  const removeTodo = (id) => {
    const todo = todos.find((t) => t.id === id)
    Alert.alert('Удаление элемента', `Удаляем "${todo.title}"?`, [
      {
        text: 'Нет',
        style: 'cancel',
      },
      {
        text: 'Удаляем',
        style: 'destructive',

        onPress: () => {
          setTodoId(null)
          setTodos((prev) => prev.filter((todo) => todo.id !== id))
        },
      },
    ])
  }

  const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    )
  }

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
