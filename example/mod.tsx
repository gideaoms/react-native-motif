import * as Native from 'react-native'
import { createTheme } from '../src/mod'

const { styled, ThemeProvider, theme } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  fontSizes: {
    md: 15,
    sm: 10,
  },
})

const Box = styled(Native.View, theme => ({
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

const Text = styled(Native.Text, theme => ({
  variants: {
    color: {
      primary: {
        color: theme.colors.primary,
      },
      secondary: {
        color: theme.colors.secondary,
      },
    },
    fontSize: {
      md: {
        fontSize: theme.fontSizes.md,
      },
      sm: {
        fontSize: theme.fontSizes.sm,
      },
    },
  },
}))

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        background="secondary"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        <Text
          color="primary"
          fontSize="md"
        >
          Hello world
        </Text>
      </Box>
    </ThemeProvider>
  )
}
