import { StyleSheet, View, FlatList, Text } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  let content = (
    <FlatList
      keyExtractor={(item) => item.id}
      data={todos}
      renderItem={({ item }) => (
        <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
      )}
    />
  )
  if (todos.length === 0){
    content = <View></View>
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}
const styles = StyleSheet.create({
  voidText: {
    color: THEME.GREY_COLOR,
    fontSize: 50,
  },
})
