import { StyleSheet, View, Text, Button, Modal } from 'react-native'
import { useState } from 'react'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'

export const TodoScreen = ({ goMain, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false)

  const saveHandler = (title) => {
    onSave(todo.id, title)
    setModal(false)
    // goMain() сразу на главную
  }

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <View style={styles.cardButon}>
          <Button title="Edit" onPress={() => setModal(true)} />
        </View>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" onPress={goMain} color={THEME.GREY_COLOR} />
        </View>
        <View style={styles.button}>
          <Button
            title="Удалить"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
  },
  cardButon: {
    maxWidth: '20%',
  },
  title: {
    maxWidth: '80%',
    fontSize: 20,
    paddingRight: 20,
  },
  edit: {
    maxHeight: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
})
