import { Text } from 'react-native'
import { createTheme } from '../src/mod'

const { styled } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
})

const text = styled(theme => ({
  base: {
    alignContent: 'center',
  },
  variants: {
    color: {
      primary: {
        color: theme.colors.primary,
      },
      secondary: {
        color: theme.colors.secondary,
      },
    },
  },
}))

export function App() {
  return (
    <Text
      style={text({
        color: 'primary',
        style: {
          marginBottom: 10,
        },
      })}
    >
      Hello world
    </Text>
  )
}
