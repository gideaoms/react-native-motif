import Native from 'react-native'
import { createTheme } from './v6'

const styled = createTheme({
  colors: {
    primary: 'red',
  },
})

const View = styled(Native.View, theme => ({
  backgroundColor: theme.colors.primary,
}))

const Text = styled(Native.Text, theme => ({
  color: theme.colors.primary,
}))

export function main() {
  return (
    <View style={{ backgroundColor: '' }}>
      <Text>Hi there</Text>
    </View>
  )
}
