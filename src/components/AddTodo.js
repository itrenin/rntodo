import { View, StyleSheet, TextInput, Button, Alert } from 'react-native'
import { useState } from 'react'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
    } else {
      Alert.alert('Добавить надо что-то, а не пустоту :(')
    }
  }
//   const keypressHandler = () => {
      
//   }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Что делаем?"
      />
      <Button title="Add" onPress={pressHandler} />
    </View>
  )
}
const styles = StyleSheet.create({
  block: {
    //flex:6,
    flexDirection: 'row',
    // margin: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
    padding: 10,
  },
  button: {},
})
