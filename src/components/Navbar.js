import React from 'react'
import { THEME } from '../theme'

import { View, Text, StyleSheet } from 'react-native'

export const Navbar = (props) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    navbar:{
        height: '10%',
        minHeight: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: THEME.MAIN_COLOR,
        paddingBottom: 10

    },
    text:{
        color: 'white',
        fontSize: 20
    }
})
