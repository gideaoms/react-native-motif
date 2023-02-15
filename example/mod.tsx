import { Text, View } from 'react-native'
import { createTheme } from '../src/mod'

const { styled } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  sizes: {
    md: 15,
  },
})

const Box = styled(View, theme => ({
  backgroundColor: theme.colors.primary,
  variants: {
    background: {
      primary: {
        backgroundColor: theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
      },
    },
  },
}))

const Title = styled(Text, theme => ({
  fontSize: theme.sizes.md,
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
    <Box
      background="secondary"
      style={{
        marginTop: 10,
      }}
    >
      <Title color="primary">Hello world</Title>
    </Box>
  )
}
