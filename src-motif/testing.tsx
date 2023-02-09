import React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'
import { createTheme } from './v2'

const styled = createTheme({
  colors: {
    primary: 'red',
  },
  spaces: {
    s: 5,
    m: 10,
  },
})

const Box = styled<ViewStyle>(View, theme => ({
  backgroundColor: 'red',
}))

const Title = styled(Text, theme => ({}))

export function App2() {
  return (
    <Box>
      <Title>Hi</Title>
      <View />
    </Box>
  )
}
