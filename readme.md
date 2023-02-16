# React Native Motif (beta)

This is the initial version of React Native Motif, a React Native Library to build UI.

```tsx
// src/motif.tsx

import { createTheme } from 'react-native-motif'

export const { ThemeProvider, useTheme, theme, styled } = createTheme({
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  fontSizes: {
    sm: 15,
    md: 18,
  },
  spaces: {
    sm: 5,
    md: 10,
  },
})
```

```tsx
// src/app.tsx

export function App() {
  return <ThemeProvider value={theme}>...</ThemeProvider>
}
```

```tsx
// src/components/box.tsx

import { View } from 'react-native'
import { styled } from '../../motif'

export const Box = styled(View, theme => ({
  width: '100%',
  variants: {
    padding: {
      md: {
        padding: theme.spaces.md,
      },
      sm: {
        padding: theme.spaces.sm,
      },
    },
  },
}))
```

```tsx
// src/app.tsx

import { Box } from './components/box'

export function App() {
  return (
    <Box padding="md">
      <Text>Hello world</Text>
    </Box>
  )
}
```
