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

const color = createStyle({
  primary: {
    color: theme.colors.primary,
  },
  secondary: {
    color: 'red',
  },
})

const fontSize = createStyle({
  sm: {
    fontSize: theme.fontSizes.sm,
  },
  lg: {
    fontSize: theme.fontSizes.lg,
  },
})

type Props = {
  children: string | string[]
  color?: VariantProps<typeof color>
  fontSize?: VariantProps<typeof fontSize>
}

const full = createStyle({
  true: {
    width: '100%',
  },
})

export type ButtonProps = {
  title: string
  onPress: () => void
  full?: VariantProps<typeof full>
}

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[full.get(props.full)]}
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
      <Text style={[fontSize.get(props.fontSize), color.get(props.color)]}>
        {props.children}
      </Text>
    </ThemeProvider>
  )
}
