import { StyleSheet, View, Text, Button } from 'react-native'

export const TodoScreen = ({ goMain, todo }) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <Button title="Назад" onPress={goMain} />
      <Button title="Удалить" color='#ff0000' onPress={() => console.log('To remove')} />
    </View>
  )
}
const stiles = StyleSheet.create({})
