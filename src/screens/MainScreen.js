import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { useState, useEffect, useContext, useCallback } from 'react'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } =
    useContext(TodoContext)
  const { changeScreen } = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  // ставим слушатель события
  // ловим изменение положения экрана по событию change и пихаем
  // в стейт новое значение ширины для перерисовки компонента
  useEffect(() => {
    const subscribtion = Dimensions.addEventListener('change', () =>
      setDeviceWidth(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      )
    )
    return () => {
      // удаляем слушатель события
      subscribtion?.remove()
    }
  })
  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  )
  if (todos.length === 0) {
    content = (
      <View style={styles.imgwrap}>
        <Image
          style={styles.img}
          source={require('../../assets/no-items.png')}
        />
        {/* <Image
          style={styles.img}
          source={{
            uri: 'https://www.pngall.com/wp-content/uploads/5/Albert-Einstein.png',
          }}
        /> */}
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}
const styles = StyleSheet.create({
  imgwrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 300,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})
