import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export const Todo = ({ todo, onRemove, onOpen }) => {
  // const longpressHandler = () => {
  //   onRemove(todo.id)
  // }

  return (
    <TouchableOpacity
      delayLongPress={1700}
      onPress={() => onOpen(todo.id)}
      // onLongPress={longpressHandler}
      onLongPress={onRemove.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
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
