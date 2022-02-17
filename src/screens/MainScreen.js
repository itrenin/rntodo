import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )
 useEffect(() => {
   const subscribtion = Dimensions.addEventListener('change', () => setDeviceWidth(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2))
  return ()=>{
    subscribtion?.remove()
  }
 })
  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
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
