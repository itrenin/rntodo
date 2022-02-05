import { StyleSheet, View, Text, Button } from 'react-native'

export const TodoScreen = ({ goMain, todo }) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttons}>
        <Button title="Назад" onPress={goMain} />
        <Button
          title="Удалить"
          color="#ff0000"
          onPress={() => console.log('To remove')}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
