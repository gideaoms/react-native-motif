import { Text, View } from 'react-native'
import { styled, type VariantProps } from './mod'
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

type BoxProps = {
  children: ReactNode
} & VariantProps<typeof box>

export function Box(props: BoxProps) {
  return (
    <View
      style={{
        backgroundColor: box.backgroundColor.get(props.backgroundColor),
        width: box.width.get(props.width),
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
      width='full'
    >
      <Text>Hello</Text>
    </Box>
  )
}
