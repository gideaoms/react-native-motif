import { Text, TouchableOpacity } from 'react-native'
import { VariantProps, createTheme, variant, styled } from './mod'
import { ReactNode } from 'react'

const { theme, ThemeProvider } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  fontSizes: {
    sm: 10,
    lg: 20,
  },
})

const button = styled({
  base: {
    padding: 10,
  },
  variants: {
    fontSize: {
      sm: {
        fontSize: theme.fontSizes.sm,
      },
      lg: {
        fontSize: theme.fontSizes.lg,
      },
    },
    full: {
      true: {
        width: '100%',
      },
    },
  },
})

type ButtonProps = {
  children: ReactNode
  onPress(): void
} & VariantProps<typeof button>

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[button.base, variant(button.variants.full, props.full)]}
    >
      {props.children}
    </TouchableOpacity>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <Button
        onPress={() => {}}
        full
      >
        <Text>Press me</Text>
      </Button>
    </ThemeProvider>
  )
}
