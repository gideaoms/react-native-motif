import { ReactNode } from 'react'
import { View } from 'react-native'
import { style, styled, variant, VariantProps } from './mod'

const box = styled({
  padding: {
    md: {
      padding: 5,
    },
    lg: {
      padding: 10,
    },
  },
  full: {
    true: {
      width: '100%',
    },
  },
  bg: {
    red: {
      backgroundColor: 'red',
    },
    yellow: {
      backgroundColor: 'yellow',
    },
  },
})

type Props = {
  children: ReactNode
} & VariantProps<typeof box>

function Box(props: Props) {
  return (
    <View
      style={[
        style.itemsCenter,
        style.justifyCenter,
        style.flexRow,
        style.flex1,
        variant(box.bg, props.bg),
        variant(box.full, props.full),
      ]}
    >
      {props.children}
    </View>
  )
}

function App() {
  return (
    <Box
      padding="md"
      full
    >
      Hello world
    </Box>
  )
}
