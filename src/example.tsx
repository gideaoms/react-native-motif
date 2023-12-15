import { ReactNode } from 'react'
import { View } from 'react-native'
import { styled, variant, VariantProps } from './mod'

const box = styled({
  base: {
    alignItems: 'center',
  },
  variants: {
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
        alignItems: 'center',
      },
      yellow: {
        backgroundColor: 'yellow',
      },
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
        box.base,
        variant(box.bg, props.bg),
        variant(box.full, props.full),
      ]}
    >
      {props.children}
    </View>
  )
}

export function App() {
  return (
    <Box
      padding="md"
      full
    >
      Hello world
    </Box>
  )
}
