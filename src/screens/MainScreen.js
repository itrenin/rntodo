import { StyleSheet, View, FlatList, Text, Image } from 'react-native'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'



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
