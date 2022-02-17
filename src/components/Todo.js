import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppText } from './ui/AppText'

export const Todo = ({ todo, onRemove, onOpen }) => {
  // const longpressHandler = () => {
  //   onRemove(todo.id)
  // }

  return (
    <TouchableOpacity
      delayLongPress={500}
      //delayLongPress={1000}
      onPress={() => onOpen(todo.id)}
      // onLongPress={longpressHandler}

      // onLongPress={() => {
      //   console.log('LooooongPress')
      // }}

      onLongPress={onRemove.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
})
