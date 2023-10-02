import { Text, TouchableOpacity } from 'react-native'
import { createTheme, VariantProps, createStyle } from './mod'

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

const title = createStyle({
  color: {
    primary: {
      color: theme.colors.primary,
    },
    secondary: {
      color: 'red',
    },
  },
  fontSize: {
    sm: {
      fontSize: theme.fontSizes.sm,
    },
    lg: {
      fontSize: theme.fontSizes.lg,
    },
  },
})()

const button = createStyle({
  full: {
    true: {
      width: '100%',
    },
  },
})({
  base: {
    padding: 10,
    backgroundColor: 'yellow',
  },
})

export type ButtonProps = {
  title: string
  onPress: () => void
} & VariantProps<typeof button>

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[button.base, button.full.get(true)]}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  )
}

type TitleProps = {
  children: string | string[]
} & VariantProps<typeof title>

export function Title(props: TitleProps) {
  return (
    <ThemeProvider>
      <Button
        title="Press me"
        onPress={() => {}}
        full
      />
      <Text
        style={[
          title.fontSize.get(props.fontSize),
          title.color.get(props.color),
        ]}
      >
        {props.children}
      </Text>
    </ThemeProvider>
  )
}
