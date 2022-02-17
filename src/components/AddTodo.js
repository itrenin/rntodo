import { View, StyleSheet, TextInput, Button, Alert, Keyboard } from 'react-native'
import { useState } from 'react'
import { THEME } from '../theme'
import { AntDesign } from '@expo/vector-icons'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
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
      {/* <Button title="Add" onPress={pressHandler} /> */}
      <AntDesign.Button onPress={pressHandler} name={'pluscircleo'}>Добавить</AntDesign.Button>
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
    width: '60%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
  },
  button: {},
})
