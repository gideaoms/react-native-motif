import { Text, TouchableOpacity, View } from 'react-native'
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

const text = styled({
  variants: {
    fontFamily: {
      roboto: {
        fontFamily: 'roboto_600',
      },
      sans: {
        fontFamily: 'sans_600',
      },
    },
  },
})

export const box = styled({
  variants: {
    padding: {
      lg: {
        padding: 20,
      },
      sm: {
        padding: 10,
      },
    },
    radius: {
      lg: {
        borderRadius: 10,
      },
      sm: {
        borderRadius: 5,
      },
    },
  },
})

export function Box(props: { children: ReactNode } & VariantProps<typeof box>) {
  return (
    <View
      style={[
        variant(box.variants.padding, props.padding),
        variant(box.variants.radius, props.radius),
      ]}
    >
      {props.children}
    </View>
  )
}

export function App(props: VariantProps<typeof text>) {
  return (
    <ThemeProvider>
      <Box
        radius="lg"
        padding="sm"
      >
        <Button
          onPress={() => {}}
          full
        >
          <Text style={[variant(text.variants.fontFamily, props.fontFamily)]}>
            Press me
          </Text>
        </Button>
      </Box>
    </ThemeProvider>
  )
}
