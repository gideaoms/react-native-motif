import { View } from 'react-native'
import { createTheme } from './mod'

const { styled } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'yellow',
  },
})

export const Box = styled(View, theme => ({
  color: theme.colors.primary,
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

function App() {
  return <Box background="secondary"></Box>
}
