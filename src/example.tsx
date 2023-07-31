import { Text, TouchableOpacity } from 'react-native'
import { createTheme, VariantProps } from './mod'

const { styled, theme, ThemeProvider } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  fontSizes: {
    sm: 10,
    lg: 20,
  },
})

const title = styled({
  base: {
    margin: 30,
  },
  variants: {
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
  },
  defaultVariants: {
    color: 'primary',
  },
})

type TitleVariants = VariantProps<typeof title>

type Props = TitleVariants & {
  children: string
}

const button = styled({
  variants: {
    full: {
      true: {
        width: '100%',
      },
    },
  },
})

type ButtonVariants = VariantProps<typeof button>

export type ButtonProps = ButtonVariants & {
  title: string
  onPress: () => void
}

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[button.style, button.full.get(props.full)]}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  )
}

export function Title(props: Props) {
  return (
    <ThemeProvider>
      <Button
        title="Press me"
        onPress={() => {}}
        full
      />
      <Text
        style={[
          title.style,
          title.fontSize.get(props.fontSize),
          title.color.get(props.color),
        ]}
      >
        {props.children}
      </Text>
    </ThemeProvider>
  )
}
