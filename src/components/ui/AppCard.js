import { StyleSheet, View } from 'react-native'
import { THEME } from '../../theme'

export const AppCard = (props) => {
  return <View style={{...styles.default, ... props.style}}>{props.children}</View>
}

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8,
    //padding: 20,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { height: 2, width: 2 },
  },
  title: {
    fontSize: 26,
  },
})
