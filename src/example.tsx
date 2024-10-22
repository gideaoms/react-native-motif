import { Text, View } from 'react-native'
import { styled, type VariantProps } from './mod.js'
import type { ReactNode } from 'react'

const box = styled({
  backgroundColor: {
    primary: 'red',
    secondary: 'blue',
  },
  width: {
    full: '100%'
  }
})

type Props = {
  children: ReactNode
} & VariantProps<typeof box>

export function Box(props: Props) {
  return (
    <View
      style={{
        backgroundColor: box.backgroundColor(props.backgroundColor),
        width: box.width(props.width),
      }}
    >
      {props.children}
    </View>
  )
}

export function App() {
  return (
    <Box
      backgroundColor="primary"
      width="full"
    >
      <Text>Hello</Text>
    </Box>
  )
}
