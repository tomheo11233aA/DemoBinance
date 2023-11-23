import Box from '@commom/Box'
import { colors } from '@theme/colors'
import React from 'react'
import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'

const Kyc = () => {
  return (
    <Animated.View style={styles.container}>

    </Animated.View >
  )
}

export default Kyc

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    height: 40
  }
})