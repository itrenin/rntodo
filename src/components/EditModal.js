import { View, StyleSheet, TextInput, Modal, Alert } from 'react-native'
import { useState } from 'react'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value)
  const saveHandler = () => {
    if (title.trim().length < 3) {
      let word = ''

      switch (title.trim().length) {
        case 0:
          word = 'Ничего'
          break
        case 1:
          word = 'Одного символа'
          break

        case 2:
          word = 'Двух символов'
          break
        default:
          break
      }

      Alert.alert(
        'Алярм!',
        `не ленись, напиши больше трёх букв. ${word} маловато.`
      )
    } else {
      onSave(title)
    }
  }

  const cancelHandler = () => {
    setTitle(value)
    onCancel()
  }

  return (
    <Modal visible={visible} animationType={'slide'} transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="На что меняем?"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={100}
        />
        <View style={styles.buttons}>
          <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
            Отменить
          </AppButton>
          <AppButton onPress={saveHandler}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
    marginBottom: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
})
