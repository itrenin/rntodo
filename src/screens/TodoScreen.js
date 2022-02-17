import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'

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
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <View style={styles.cardButon}>
          <AppButton title="Edit" onPress={() => setModal(true)}>
            <FontAwesome name="edit" size={20} />
          </AppButton>
        </View>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={goMain} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    // width: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width > 400 ? 150 : 100,
  },
  cardButon: {
    maxWidth: '25%',
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
