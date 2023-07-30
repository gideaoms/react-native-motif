import { Text } from 'react-native'
import { createTheme, VariantProps } from './mod'

const { styled, theme } = createTheme({
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

type TitleProps = VariantProps<typeof title> & { children: string }

export function Title(props: TitleProps) {
  return (
    <Text
      style={[
        title.style,
        title.color[props.color!],
        title.fontSize[props.fontSize!],
      ]}
    >
      {props.children}
    </Text>
  )
}
