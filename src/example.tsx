import { Text, View } from 'react-native'
import { styled, variant, VariantProps } from './mod'
import { ReactNode } from 'react'

const box = styled({
  backgroundColor: {
    primary: 'red',
    secondary: 'blue',
  },
  full: {
    true: '100%',
  },
})

export function Box(props: { children: ReactNode } & VariantProps<typeof box>) {
  return (
    <View
      style={{
        backgroundColor: variant(box.backgroundColor, props.backgroundColor),
        width: variant(box.full, props.full),
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
      full
    >
      <Text>Hello</Text>
    </Box>
  )
}
