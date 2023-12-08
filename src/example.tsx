import { ReactNode } from 'react'
import { View } from 'react-native'
import { style, styled, VariantProps } from './mod'

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
        style.alignItems.center,
        style.justifyContent.flexEnd,
        style.flexDirection.row,
        box.padding[props.padding!],
        box.full[props.full!],
        box.bg[props.bg!],
      ]}
    >
      {props.children}
    </View>
  )
}

export { Box }
export { Props as BoxProps }

function App() {
  return (
    <Box
      padding="md"
      full="true"
    >
      Hello world
    </Box>
  )
}

export { App }
