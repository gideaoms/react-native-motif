import { Text, View } from 'react-native'
import { styled, VariantProps } from './mod'
import { ReactNode } from 'react'

const box = styled({
  backgroundColor: {
    primary: 'red',
    secondary: 'blue',
  },
  width: {
    full: '100%'
  }
})

export function Box(props: { children: ReactNode } & VariantProps<typeof box>) {
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
